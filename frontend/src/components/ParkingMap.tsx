import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ParkingMapProps, ParkingSpot, CanvasCoordinates, SpotState } from '../types/parking';

const ParkingMap: React.FC<ParkingMapProps> = ({
  backgroundImage,
  parkingSpots,
  selectedSpotId = null,
  width = 800,
  height = 600,
  isMobile = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  // Remove internal selection state - use props.parkingSpots.isSelected instead
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [imageDrawDimensions, setImageDrawDimensions] = useState({ 
    width: 0, 
    height: 0, 
    offsetX: 0, 
    offsetY: 0 
  });

  // Zoom and pan state for mobile
  const [scale, setScale] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  // Load background image
  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      
      img.onload = () => {
        setImageLoaded(true);
        setImageError(false);
        
        // Calculate scaling to fit canvas while maintaining aspect ratio
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const canvasAspectRatio = width / height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imageAspectRatio > canvasAspectRatio) {
          // Image is wider than canvas - fit to canvas width
          drawWidth = width;
          drawHeight = width / imageAspectRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        } else {
          // Image is taller than canvas - fit to canvas height
          drawHeight = height;
          drawWidth = height * imageAspectRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        }
        
        setImageDrawDimensions({ width: drawWidth, height: drawHeight, offsetX, offsetY });
        
        // Calculate scaling factors for parking spots based on original image dimensions
        setScaleX(drawWidth / img.naturalWidth);
        setScaleY(drawHeight / img.naturalHeight);
      };
      
      img.onerror = () => {
        console.error('Failed to load background image:', backgroundImage);
        setImageError(true);
        setImageLoaded(false);
        // Use canvas dimensions as fallback for coordinate scaling
        setScaleX(1);
        setScaleY(1);
      };
      
      img.src = backgroundImage;
      backgroundImageRef.current = img;
    } else {
      // No background image - reset states
      setImageLoaded(false);
      setImageError(false);
      setScaleX(1);
      setScaleY(1);
    }
  }, [backgroundImage, width, height]);

  // Scale coordinates from original image size to canvas size with zoom/pan
  const scaleCoordinates = useCallback((coords: [number, number][]): CanvasCoordinates[] => {
    return coords.map(([x, y]) => ({
      x: (x * scaleX + imageDrawDimensions.offsetX) * scale + panX,
      y: (y * scaleY + imageDrawDimensions.offsetY) * scale + panY
    }));
  }, [scaleX, scaleY, imageDrawDimensions, scale, panX, panY]);

  // Get spot state with visual reference highlighting
  const getSpotState = useCallback((spot: ParkingSpot): SpotState => {
    return {
      id: spot.id,
      isHovered: false, // No hover state needed for visual reference
      isSelected: selectedSpotId === spot.id,
      isAvailable: spot.isAvailable !== false // Default to true if not specified
    };
  }, [selectedSpotId]);

  // Draw a parking spot on canvas with spotlight effect
  const drawParkingSpot = useCallback((
    ctx: CanvasRenderingContext2D,
    spot: ParkingSpot,
    state: SpotState
  ) => {
    const scaledCoords = scaleCoordinates(spot.coordinates);
    
    // Spotlight logic: if a spot is selected, only show visual elements for that spot
    const showAllSpots = selectedSpotId === null;
    const isSpotlightMode = selectedSpotId !== null;
    const shouldShowVisuals = showAllSpots || state.isSelected;
    
    // Only draw visual elements for selected spot in spotlight mode, or all spots when none selected
    if (shouldShowVisuals) {
      // Draw the parking spot polygon first
      ctx.beginPath();
      ctx.moveTo(scaledCoords[0].x, scaledCoords[0].y);
      for (let i = 1; i < scaledCoords.length; i++) {
        ctx.lineTo(scaledCoords[i].x, scaledCoords[i].y);
      }
      ctx.closePath();
      
      if (state.isSelected && isSpotlightMode) {
        // SELECTED SPOT: Dramatic polygon highlighting with NO number text
        
        // Add extremely prominent glow effect around the entire parking space
        ctx.shadowColor = '#2196F3';
        ctx.shadowBlur = 25; // Strong glow
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Add pulsing animation to the polygon fill
        const pulseValue = Math.sin(Date.now() / 400) * 0.1 + 0.4; // Pulse between 0.3 and 0.5
        
        // Bright blue fill with pulsing transparency to show the exact parking space
        ctx.globalAlpha = pulseValue; // 40% base opacity with pulsing effect
        ctx.fillStyle = '#2196F3'; // Bright blue
        ctx.fill();
        
        // Add second glow layer for extra prominence
        ctx.shadowBlur = 15;
        ctx.globalAlpha = pulseValue * 0.8;
        ctx.fill();
        
        // Reset shadow for border
        ctx.shadowBlur = 0;
        
        // Thick, bright white border to define parking space boundaries
        ctx.globalAlpha = 0.95;
        ctx.strokeStyle = '#FFFFFF'; // Bright white for maximum contrast
        ctx.lineWidth = 6; // Thick border to clearly show parking space edges
        ctx.stroke();
        
        // Add inner blue border for definition
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = '#1565C0'; // Darker blue inner border
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.globalAlpha = 1.0;
        
        // NO NUMBER TEXT for selected spot - just the highlighted polygon
      } else {
        // UNSELECTED SPOTS: Subtle polygon with number text (when all spots visible)
        
        // Subtle polygon fill that blends with aerial photo
        let fillColor = '#4CAF50'; // Green for available
        let alpha = 0.15; // Very subtle transparency (15%)
        
        if (!state.isAvailable) {
          fillColor = '#F44336'; // Red for unavailable
          alpha = 0.25; // Slightly more visible for unavailable spots
        }
        
        // Very subtle fill so aerial photo shows through clearly
        ctx.globalAlpha = alpha;
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        // Subtle outline border
        ctx.strokeStyle = state.isAvailable ? '#2E7D32' : '#C62828';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        
        // Calculate center point for spot number
        const centerX = scaledCoords.reduce((sum, coord) => sum + coord.x, 0) / scaledCoords.length;
        const centerY = scaledCoords.reduce((sum, coord) => sum + coord.y, 0) / scaledCoords.length;

        // Draw spot number directly on polygon with readable styling
        const fontSize = 14; // Clean, consistent size
        ctx.font = `bold ${fontSize * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add dark stroke for readability on any background
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3 * scale;
        ctx.globalAlpha = 0.8;
        ctx.strokeText(spot.id.toString(), centerX, centerY);
        
        // White text fill for high contrast
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(spot.id.toString(), centerX, centerY);
      }
    }
    // Note: In spotlight mode, unselected spots are completely invisible
    // but their coordinates still exist for potential interaction
  }, [scaleCoordinates, selectedSpotId, isMobile, animationFrame]);

  // Check if point is inside polygon (ray casting algorithm)
  const isPointInPolygon = useCallback((point: CanvasCoordinates, polygon: CanvasCoordinates[]): boolean => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (((polygon[i].y > point.y) !== (polygon[j].y > point.y)) &&
          (point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
        inside = !inside;
      }
    }
    return inside;
  }, []);

  // Find spot at given coordinates with enhanced touch target area for mobile
  const findSpotAtCoordinates = useCallback((x: number, y: number): ParkingSpot | null => {
    // Check if click is within the image bounds
    if (imageLoaded && backgroundImageRef.current) {
      const { offsetX, offsetY, width: imgWidth, height: imgHeight } = imageDrawDimensions;
      const scaledOffsetX = offsetX * scale + panX;
      const scaledOffsetY = offsetY * scale + panY;
      const scaledImgWidth = imgWidth * scale;
      const scaledImgHeight = imgHeight * scale;
      
      if (x < scaledOffsetX || x > scaledOffsetX + scaledImgWidth || 
          y < scaledOffsetY || y > scaledOffsetY + scaledImgHeight) {
        return null; // Click is outside the image area
      }
    }
    
    for (const spot of parkingSpots) {
      const scaledCoords = scaleCoordinates(spot.coordinates);
      
      // For mobile, expand touch target area
      if (isMobile) {
        // Calculate center of spot
        const centerX = scaledCoords.reduce((sum, coord) => sum + coord.x, 0) / scaledCoords.length;
        const centerY = scaledCoords.reduce((sum, coord) => sum + coord.y, 0) / scaledCoords.length;
        
        // Check if touch is within expanded radius (minimum 44px touch target)
        const touchRadius = Math.max(22, 15 * scale);
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        
        if (distance <= touchRadius) {
          return spot;
        }
      } else {
        // Desktop - use precise polygon detection
        if (isPointInPolygon({ x, y }, scaledCoords)) {
          return spot;
        }
      }
    }
    return null;
  }, [parkingSpots, scaleCoordinates, isPointInPolygon, imageLoaded, imageDrawDimensions, isMobile, scale, panX, panY]);

  // Get mouse/touch coordinates relative to canvas
  const getCanvasCoordinates = useCallback((
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): CanvasCoordinates => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Handle touch events
    if ('touches' in event) {
      const touch = event.touches[0] || event.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    
    // Handle mouse events
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, []);

  // Render the canvas
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background (image or fallback) with zoom/pan support
    if (imageLoaded && backgroundImageRef.current) {
      // Draw background image with proper scaling, positioning, zoom and pan
      ctx.drawImage(
        backgroundImageRef.current,
        imageDrawDimensions.offsetX * scale + panX,
        imageDrawDimensions.offsetY * scale + panY,
        imageDrawDimensions.width * scale,
        imageDrawDimensions.height * scale
      );
    } else if (imageError) {
      // Draw fallback background if image failed to load
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);
      
      // Draw error message
      ctx.fillStyle = '#666';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Background image failed to load', width / 2, height / 2);
    } else if (backgroundImage) {
      // Draw loading state
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#999';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Loading background image...', width / 2, height / 2);
    } else {
      // No background image - draw light gray background
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw all parking spots ON TOP of background
    parkingSpots.forEach(spot => {
      const state = getSpotState(spot);
      drawParkingSpot(ctx, spot, state);
    });
  }, [imageLoaded, imageError, backgroundImage, imageDrawDimensions, width, height, parkingSpots, getSpotState, drawParkingSpot, scale, panX, panY, animationFrame]);

  // Re-render when dependencies change
  useEffect(() => {
    render();
  }, [render]);

  // Animation loop for pulsing selected spot
  useEffect(() => {
    if (selectedSpotId) {
      const animate = () => {
        setAnimationFrame(prev => prev + 1);
        requestAnimationFrame(animate);
      };
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [selectedSpotId]);

  // Mouse events not needed for visual reference map

  // Map is now visual reference only - no click handling needed

  // Calculate distance between two touch points
  const getTouchDistance = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (event.touches.length < 2) return 0;
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // Handle touch events for mobile with zoom/pan support only
  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault(); // Prevent scrolling
    
    if (event.touches.length === 1 && isMobile) {
      // Single touch - start panning
      const coords = getCanvasCoordinates(event);
      setIsPanning(true);
      setLastPanPoint({ x: coords.x, y: coords.y });
    } else if (event.touches.length === 2) {
      // Two fingers - start pinch zoom
      setLastTouchDistance(getTouchDistance(event));
      setIsPanning(false);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    
    if (event.touches.length === 1 && isPanning && isMobile) {
      // Pan the view
      const coords = getCanvasCoordinates(event);
      const deltaX = coords.x - lastPanPoint.x;
      const deltaY = coords.y - lastPanPoint.y;
      setPanX(prev => prev + deltaX);
      setPanY(prev => prev + deltaY);
      setLastPanPoint({ x: coords.x, y: coords.y });
    } else if (event.touches.length === 2 && isMobile) {
      // Pinch zoom
      const currentDistance = getTouchDistance(event);
      if (lastTouchDistance > 0) {
        const scaleChange = currentDistance / lastTouchDistance;
        setScale(prev => Math.max(0.5, Math.min(3, prev * scaleChange)));
      }
      setLastTouchDistance(currentDistance);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    
    // Reset touch states
    setIsPanning(false);
    setLastTouchDistance(0);
  };

  return (
    <div style={{ 
      display: 'inline-block', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '100%',
      position: 'relative'
    }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          touchAction: 'none', // Prevent default touch behaviors
          display: 'block',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '15px',
          fontSize: '12px',
          pointerEvents: 'none'
        }}>
          Pinch to zoom • Drag to pan
        </div>
      )}
    </div>
  );
};

export default ParkingMap; 