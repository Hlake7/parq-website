// Parking system type definitions

export interface ParkingSpot {
  id: number;
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
  isAvailable?: boolean;
  isSelected?: boolean;
}

export interface ParkingMapProps {
  backgroundImage: string;
  parkingSpots: ParkingSpot[];
  selectedSpotId?: number | null;
  width?: number;
  height?: number;
  isMobile?: boolean;
}

export interface CanvasCoordinates {
  x: number;
  y: number;
}

export interface SpotState {
  id: number;
  isHovered: boolean;
  isSelected: boolean;
  isAvailable: boolean;
} 