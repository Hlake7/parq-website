import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ParkingMap } from './index';
import { ParkingSpot } from '../types/parking';
import './BusinessPages.css';

const BookingPage: React.FC = () => {
  // Updated parking lot coordinates for new aerial photo
  const [parkingSpots] = useState<ParkingSpot[]>([
    { id: 1, coordinates: [[113, 659], [129, 747], [176, 748], [160, 657]], isAvailable: true },
    { id: 2, coordinates: [[160, 658], [176, 748], [222, 748], [207, 657]], isAvailable: true },
    { id: 3, coordinates: [[208, 657], [222, 748], [268, 746], [254, 657]], isAvailable: true },
    { id: 4, coordinates: [[254, 659], [268, 747], [313, 746], [299, 657]], isAvailable: true },
    { id: 5, coordinates: [[299, 658], [313, 746], [359, 746], [345, 657]], isAvailable: true },
    { id: 6, coordinates: [[346, 658], [359, 746], [405, 746], [389, 657]], isAvailable: true },
    { id: 7, coordinates: [[415, 657], [430, 746], [469, 746], [455, 657]], isAvailable: true },
    { id: 8, coordinates: [[496, 657], [511, 745], [549, 745], [534, 657]], isAvailable: true },
    { id: 9, coordinates: [[536, 657], [550, 745], [592, 745], [577, 656]], isAvailable: true },
    { id: 10, coordinates: [[578, 657], [592, 745], [634, 745], [619, 656]], isAvailable: true },
    { id: 11, coordinates: [[619, 658], [633, 745], [675, 743], [659, 656]], isAvailable: true },
    { id: 12, coordinates: [[659, 657], [675, 743], [716, 743], [700, 656]], isAvailable: true },
    { id: 13, coordinates: [[701, 657], [717, 742], [757, 744], [740, 655]], isAvailable: true },
    { id: 14, coordinates: [[741, 657], [758, 743], [799, 742], [782, 656]], isAvailable: true },
    { id: 15, coordinates: [[783, 657], [800, 743], [843, 741], [823, 654]], isAvailable: true },
    { id: 16, coordinates: [[843, 605], [843, 643], [931, 629], [931, 590]], isAvailable: true },
    { id: 17, coordinates: [[843, 563], [844, 605], [931, 589], [932, 548]], isAvailable: true },
    { id: 18, coordinates: [[843, 524], [843, 562], [932, 548], [932, 507]], isAvailable: true },
    { id: 19, coordinates: [[844, 482], [843, 521], [932, 506], [932, 467]], isAvailable: true },
    { id: 20, coordinates: [[844, 441], [845, 481], [933, 468], [934, 425]], isAvailable: true },
    { id: 21, coordinates: [[845, 401], [845, 440], [934, 424], [934, 385]], isAvailable: true },
    { id: 22, coordinates: [[846, 358], [846, 399], [934, 384], [935, 344]], isAvailable: true },
    { id: 23, coordinates: [[848, 317], [848, 358], [935, 342], [935, 302]], isAvailable: true },
    { id: 24, coordinates: [[849, 275], [849, 317], [935, 303], [934, 262]], isAvailable: true },
    { id: 25, coordinates: [[849, 234], [850, 275], [935, 261], [935, 220]], isAvailable: true },
    { id: 26, coordinates: [[849, 194], [850, 234], [936, 219], [936, 180]], isAvailable: true },
    { id: 27, coordinates: [[849, 155], [849, 193], [936, 178], [936, 142]], isAvailable: true },
    { id: 28, coordinates: [[760, 178], [679, 154], [679, 202], [757, 224]], isAvailable: true },
    { id: 29, coordinates: [[757, 225], [679, 205], [679, 244], [757, 268]], isAvailable: true },
    { id: 30, coordinates: [[757, 268], [679, 245], [679, 286], [758, 310]], isAvailable: true },
    { id: 31, coordinates: [[680, 289], [679, 330], [757, 349], [758, 311]], isAvailable: true },
    { id: 32, coordinates: [[679, 396], [678, 440], [758, 460], [757, 416]], isAvailable: true },
    { id: 33, coordinates: [[679, 439], [678, 474], [757, 500], [758, 460]], isAvailable: true }
  ]);

  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // New form fields
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [smsReminders, setSmsReminders] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Promo code state
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string; discount: number} | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  // Start time for the reservation
  const [startTime] = useState<Date>(new Date());

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Parking duration options with pricing (base rate: $5/hour)
  const durationOptions = useMemo(() => [
    { value: '0.5', label: '30 min', hours: 0.5, price: 2.5 },
    { value: '1', label: '1 hour', hours: 1, price: 5 },
    { value: '2', label: '2 hours', hours: 2, price: 10 },
    { value: '4', label: '4 hours', hours: 4, price: 20 },
    { value: '6', label: '6 hours', hours: 6, price: 30 },
    { value: '8', label: '8 hours', hours: 8, price: 40 }
  ], []);

  // Promo codes configuration
  const validPromoCodes = useMemo(() => ({
    'SAVE10': 0.10,  // 10% off
    'SAVE20': 0.20,  // 20% off
    'WELCOME': 0.15, // 15% off
    'FREEPARKING': 0.50 // 50% off
  }), []);

  // Calculate final price with promo code discount
  const calculateFinalPrice = useMemo(() => {
    if (!selectedDuration) return 0;
    const option = durationOptions.find(opt => opt.value === selectedDuration);
    const basePrice = option?.price || 0;

    if (appliedPromo) {
      const discount = basePrice * appliedPromo.discount;
      return basePrice - discount;
    }

    return basePrice;
  }, [selectedDuration, durationOptions, appliedPromo]);

  // Calculate end time based on duration
  const getEndTime = useMemo(() => {
    if (!selectedDuration) return null;
    const option = durationOptions.find(opt => opt.value === selectedDuration);
    if (!option) return null;

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + (option.hours * 60));
    return endTime;
  }, [selectedDuration, durationOptions, startTime]);

  // Update price when duration or promo changes
  useEffect(() => {
    setSelectedPrice(calculateFinalPrice);
  }, [calculateFinalPrice]);

  // Handle promo code application
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }

    const discount = validPromoCodes[code as keyof typeof validPromoCodes];
    if (discount) {
      setAppliedPromo({ code, discount });
      setPromoError('');
      console.log(`Promo code ${code} applied: ${discount * 100}% off`);
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  // Remove promo code
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  // Detect mobile device and set responsive canvas size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // Mobile canvas size - fit within viewport with padding
        const padding = 40;
        const maxWidth = Math.min(window.innerWidth - padding, 380);
        const maxHeight = Math.min(window.innerHeight * 0.5, 400);
        setCanvasSize({ width: maxWidth, height: maxHeight });
      } else {
        // Desktop canvas size
        setCanvasSize({ width: 800, height: 600 });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle spot selection from dropdown
  const handleSpotSelect = (value: string) => {
    if (value === '') {
      // User selected "Choose a spot" - reset to show all spots
      setSelectedSpot(null);
      setSelectedDuration('');
      console.log('Selection cleared - showing all spots');
    } else {
      const spotId = parseInt(value);
      setSelectedSpot(spotId);
      console.log('Spot selected:', spotId);
    }
  };

  // Handle duration selection
  const handleDurationSelect = (value: string) => {
    setSelectedDuration(value);
    console.log('Duration selected:', value);
  };

  // Handle phone input with validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    // Limit to 10 digits
    const limitedValue = numericValue.slice(0, 10);
    // Format as (XXX) XXX-XXXX
    let formattedValue = limitedValue;
    if (limitedValue.length >= 6) {
      formattedValue = `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(3, 6)}-${limitedValue.slice(6)}`;
    } else if (limitedValue.length >= 3) {
      formattedValue = `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(3)}`;
    }
    setPhone(formattedValue);
  };

  // Validate form
  const isFormValid = () => {
    const phoneDigits = phone.replace(/\D/g, '');
    return selectedSpot && selectedDuration && selectedPrice > 0 &&
           email.trim() !== '' && phoneDigits.length === 10 && licensePlate.trim() !== '';
  };

  // Handle continue to payment
  const handleContinueToPayment = async () => {
    if (!isFormValid()) {
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
      } else {
        alert('Please fill in all required fields.');
      }
      return;
    }

    setIsLoading(true);
    try {
      console.log('Creating payment session...');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spotId: selectedSpot,
          duration: selectedDuration,
          price: selectedPrice,
          email: email.trim(),
          phone: phone.trim(),
          licensePlate: licensePlate.trim().toUpperCase(),
          smsReminders,
          promoCode: appliedPromo?.code || null,
          promoDiscount: appliedPromo?.discount || 0
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Payment session created:', data);

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment system temporarily unavailable. Please check console and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">Parq</span>
            <span className="logo-tagline">AI</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="nav-menu desktop-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/book/lumber-building" className="nav-link active">Demo</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-icon">☰</span>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-menu">
              <div className="mobile-menu-header">
                <Link to="/" className="mobile-nav-logo" onClick={closeMobileMenu}>
                  <span className="logo-text">Parq</span>
                  <span className="logo-tagline">AI</span>
                </Link>
                <button 
                  className="mobile-menu-close"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  ✕
                </button>
              </div>
              <div className="mobile-nav-links">
                <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
                <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
                <Link to="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</Link>
                <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
                <Link to="/privacy" className="mobile-nav-link" onClick={closeMobileMenu}>Privacy Policy</Link>
                <Link to="/terms" className="mobile-nav-link" onClick={closeMobileMenu}>Terms of Service</Link>
                <Link to="/book/lumber-building" className="mobile-nav-cta" onClick={closeMobileMenu}>Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Warning Banner */}
      <div style={{
        marginTop: '80px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        padding: isMobile ? '1rem 1rem' : '1.5rem 2rem',
        textAlign: 'center',
        borderBottom: '4px solid #b45309',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
      }}>
        <h2 style={{
          color: 'white',
          fontSize: isMobile ? '1.3rem' : '1.8rem',
          fontWeight: '700',
          margin: '0 0 0.5rem 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          ⚠️ DEMONSTRATION ONLY
        </h2>
        <p style={{
          color: 'white',
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          margin: 0,
          fontWeight: '500',
          opacity: 0.95
        }}>
          This is an example page for illustration purposes. Do not use for actual bookings.
        </p>
      </div>

      {/* Booking Header */}
      <div style={{
        padding: isMobile ? '2rem 1rem 1rem' : '3rem 2rem 1rem',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        borderBottom: '1px solid #e9ecef'
      }}>
        <h1 style={{
          color: '#1a1a1a',
          marginBottom: '0.5rem',
          fontSize: isMobile ? '1.8rem' : '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Lumber Building Parking
        </h1>
        <p style={{
          color: '#6c757d',
          fontSize: isMobile ? '1rem' : '1.1rem',
          marginBottom: '1rem'
        }}>
          Reserve your parking spot with our AI-powered booking system
        </p>
      </div>

      <div style={{ 
        padding: isMobile ? '15px' : '20px', 
        backgroundColor: '#f8f9fa', 
        minHeight: '100vh'
      }}>
        
        <p style={{ 
          fontSize: isMobile ? '16px' : '18px', 
          color: '#5a6c7d', 
          fontWeight: '400',
          textAlign: 'center',
          maxWidth: '90%',
          margin: '0 auto',
          marginBottom: isMobile ? '15px' : '20px'
        }}>
{isMobile ? "View the parking lot map below, then select your spot to highlight it" : "View all available parking spots on the map below, then select your spot from the dropdown to highlight your space in blue"}
        </p>

        {/* Spot Selector */}
        <div style={{ 
          margin: isMobile ? '15px 10px' : '20px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          <label style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: '#2c3e50',
            textAlign: 'center'
          }}>
            Select Spot Number:
          </label>
          
          <select
            value={selectedSpot || ''}
            onChange={(e) => handleSpotSelect(e.target.value)}
            style={{
              fontSize: isMobile ? '18px' : '16px',
              padding: isMobile ? '12px 20px' : '10px 16px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              backgroundColor: 'white',
              color: '#2c3e50',
              fontWeight: '500',
              minWidth: isMobile ? '120px' : '100px',
              minHeight: isMobile ? '48px' : '40px',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <option value="">Choose a spot</option>
            {Array.from({ length: 33 }, (_, i) => i + 1).map(spotNumber => (
              <option key={spotNumber} value={spotNumber}>
                Spot {spotNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Parking Map - Shows immediately after spot selection */}
        
          <div style={{
            marginTop: isMobile ? '20px' : '30px',
            marginBottom: isMobile ? '20px' : '30px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}>
            <ParkingMap
              backgroundImage="/parking-lot-aerial.png"
              parkingSpots={parkingSpots}
              selectedSpotId={selectedSpot}
              width={canvasSize.width}
              height={canvasSize.height}
              isMobile={isMobile}
            />
          </div>
        

        {/* Duration Cards */}
        {selectedSpot && (
          <div style={{
            margin: isMobile ? '20px 10px' : '30px auto',
            maxWidth: '900px',
            padding: isMobile ? '0 10px' : '0 20px'
          }}>
            <h3 style={{
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: '600',
              color: '#2d3748',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Select Parking Duration
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: isMobile ? '12px' : '16px',
              maxWidth: '100%'
            }}>
              {durationOptions.map(option => {
                const isSelected = selectedDuration === option.value;
                return (
                  <div
                    key={option.value}
                    onClick={() => handleDurationSelect(option.value)}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'white',
                      border: isSelected
                        ? '2px solid #667eea'
                        : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: isMobile ? '16px 12px' : '20px 16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isSelected
                        ? '0 8px 24px rgba(102, 126, 234, 0.3)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                      transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                      minHeight: isMobile ? '90px' : '100px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                      }
                    }}
                  >
                    <div style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '700',
                      color: isSelected ? 'white' : '#2d3748'
                    }}>
                      {option.label}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: isSelected ? 'white' : '#4a5568'
                    }}>
                      ${option.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {selectedSpot && selectedDuration && (
          <div style={{
            margin: isMobile ? '20px 10px' : '30px auto',
            maxWidth: isMobile ? '100%' : '400px',
            width: '100%'
          }}>
            <h3 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: '#2c3e50',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Contact Information
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              padding: isMobile ? '0 10px' : '0'
            }}>
              {/* Email Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '5px'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    fontSize: isMobile ? '16px' : '14px',
                    padding: isMobile ? '12px 15px' : '10px 12px',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    backgroundColor: 'white',
                    color: '#2c3e50',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    minHeight: isMobile ? '48px' : '40px'
                  }}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '5px'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    fontSize: isMobile ? '16px' : '14px',
                    padding: isMobile ? '12px 15px' : '10px 12px',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    backgroundColor: 'white',
                    color: '#2c3e50',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    minHeight: isMobile ? '48px' : '40px'
                  }}
                />
              </div>

              {/* License Plate Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '5px'
                }}>
                  License Plate Number *
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="ABC-1234"
                  style={{
                    width: '100%',
                    fontSize: isMobile ? '16px' : '14px',
                    padding: isMobile ? '12px 15px' : '10px 12px',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    backgroundColor: 'white',
                    color: '#2c3e50',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    minHeight: isMobile ? '48px' : '40px',
                    textTransform: 'uppercase'
                  }}
                />
              </div>

              {/* SMS Reminders Checkbox */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 0'
              }}>
                <input
                  type="checkbox"
                  id="smsReminders"
                  checked={smsReminders}
                  onChange={(e) => setSmsReminders(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <label
                  htmlFor="smsReminders"
                  style={{
                    fontSize: isMobile ? '14px' : '15px',
                    color: '#2c3e50',
                    cursor: 'pointer',
                    lineHeight: '1.4'
                  }}
                >
                  I agree to receive an SMS alert from Parqit 15 minutes before my parking session expires. Message & data rates may apply. Reply STOP to opt-out.
                </label>
              </div>
            </div>

            {/* Promo Code Section */}
            <div style={{
              marginTop: '25px',
              padding: isMobile ? '0 10px' : '0'
            }}>
              <h3 style={{
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '12px'
              }}>
                Promo Code
              </h3>

              {!appliedPromo ? (
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError('');
                      }}
                      placeholder="Enter promo code"
                      style={{
                        width: '100%',
                        fontSize: isMobile ? '16px' : '14px',
                        padding: isMobile ? '12px 15px' : '10px 12px',
                        borderRadius: '8px',
                        border: promoError ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                        backgroundColor: 'white',
                        color: '#2d3748',
                        outline: 'none',
                        textTransform: 'uppercase',
                        minHeight: isMobile ? '48px' : '40px'
                      }}
                    />
                    {promoError && (
                      <p style={{
                        color: '#e53e3e',
                        fontSize: '14px',
                        marginTop: '4px',
                        marginBottom: 0
                      }}>
                        {promoError}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: isMobile ? '12px 20px' : '10px 20px',
                      borderRadius: '8px',
                      fontSize: isMobile ? '16px' : '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      minHeight: isMobile ? '48px' : '40px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div style={{
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  color: 'white',
                  padding: isMobile ? '12px 15px' : '12px 16px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: isMobile ? '15px' : '16px' }}>
                      {appliedPromo.code} Applied
                    </div>
                    <div style={{ fontSize: isMobile ? '13px' : '14px', opacity: 0.9 }}>
                      {(appliedPromo.discount * 100).toFixed(0)}% discount
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Reservation Summary */}
            <div style={{
              marginTop: '25px',
              background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: isMobile ? '20px 15px' : '24px 20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '700',
                color: '#2d3748',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Reservation Summary
              </h3>

              {/* Time Display */}
              {getEndTime && (
                <div style={{
                  background: 'white',
                  padding: isMobile ? '12px' : '14px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: isMobile ? '13px' : '14px',
                    color: '#718096',
                    fontWeight: '600',
                    marginBottom: '6px',
                    textAlign: 'center'
                  }}>
                    PARKING TIME
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '15px',
                    color: '#2d3748',
                    fontWeight: '500',
                    lineHeight: '1.6',
                    textAlign: 'center'
                  }}>
                    <div>
                      <strong>Start:</strong> {startTime.toLocaleDateString('en-US', { weekday: 'short' })} at {startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div style={{ margin: '4px 0', color: '#667eea', fontWeight: '600' }}>→</div>
                    <div>
                      <strong>End:</strong> {getEndTime.toLocaleDateString('en-US', { weekday: 'short' })} at {getEndTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}

              {/* Cost Breakdown */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: isMobile ? '15px' : '16px',
                  color: '#4a5568'
                }}>
                  <span>Spot #{selectedSpot}</span>
                  <span style={{ fontWeight: '500' }}>
                    {durationOptions.find(opt => opt.value === selectedDuration)?.label}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: isMobile ? '15px' : '16px',
                  color: '#4a5568'
                }}>
                  <span>Base Price</span>
                  <span style={{ fontWeight: '500' }}>
                    ${durationOptions.find(opt => opt.value === selectedDuration)?.price.toFixed(2)}
                  </span>
                </div>

                {appliedPromo && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: isMobile ? '15px' : '16px',
                    color: '#48bb78',
                    fontWeight: '600'
                  }}>
                    <span>Discount ({appliedPromo.code})</span>
                    <span>
                      -${((durationOptions.find(opt => opt.value === selectedDuration)?.price || 0) * appliedPromo.discount).toFixed(2)}
                    </span>
                  </div>
                )}

                <div style={{
                  borderTop: '2px solid #e2e8f0',
                  marginTop: '8px',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '700',
                  color: '#2d3748'
                }}>
                  <span>Total</span>
                  <span style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    ${selectedPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedSpot && selectedDuration && selectedPrice > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: isMobile ? '20px 10px' : '30px 20px'
          }}>
            <button
              onClick={handleContinueToPayment}
              disabled={!isFormValid() || isLoading}
              style={{
                background: !isFormValid() || isLoading
                  ? '#cbd5e0'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: isMobile ? '16px 40px' : '20px 60px',
                borderRadius: '12px',
                fontSize: isMobile ? '18px' : '22px',
                fontWeight: '700',
                cursor: !isFormValid() || isLoading ? 'not-allowed' : 'pointer',
                boxShadow: !isFormValid() || isLoading
                  ? 'none'
                  : '0 8px 24px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                minHeight: isMobile ? '54px' : '60px',
                width: isMobile ? '90%' : 'auto',
                maxWidth: isMobile ? '400px' : '500px',
                opacity: !isFormValid() || isLoading ? 0.6 : 1,
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                if (isFormValid() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (isFormValid() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {isLoading ? 'Processing...' : 'Continue to Checkout'}
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div style={{
          marginTop: isMobile ? '25px' : '40px',
          fontSize: isMobile ? '13px' : '14px',
          color: '#6c757d',
          maxWidth: isMobile ? '95%' : '600px',
          lineHeight: '1.6',
          padding: isMobile ? '0 10px' : '0',
          margin: isMobile ? '25px 10px 0' : '40px auto 0'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '15px' : '30px', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: isMobile ? '15px' : '20px',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            {!selectedSpot ? (
              // Show legend when no spot is selected
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#4CAF50', fontSize: isMobile ? '14px' : '16px' }}>▢</span> 
                <span style={{ color: '#495057', fontWeight: '500', fontSize: isMobile ? '12px' : '14px' }}>Numbered Parking Spaces</span>
              </div>
            ) : (
              // Show selected spot legend
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2196F3', fontSize: isMobile ? '18px' : '20px' }}>▬</span> 
                <span style={{ color: '#495057', fontWeight: '600', fontSize: isMobile ? '12px' : '14px' }}>Your Parking Space</span>
              </div>
            )}
          </div>
          <p style={{
            textAlign: 'center',
            margin: 0,
            color: '#6c757d',
            fontSize: isMobile ? '13px' : '15px',
            lineHeight: '1.5'
          }}>
            {selectedSpot
              ? (isMobile ? 'Your parking space is highlighted above with blue glow and clear boundaries' : 'Your selected parking space is highlighted on the aerial map with bright blue fill and clear boundaries')
              : (isMobile ? 'Choose your spot number to highlight the exact parking space' : 'Select your parking spot number to highlight the exact parking space boundaries on the aerial map')
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;