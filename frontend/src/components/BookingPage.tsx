import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ParkingMap } from './index';
import { ParkingSpot } from '../types/parking';
import './BusinessPages.css';

const BookingPage: React.FC = () => {
  // Manually positioned parking lot coordinates perfectly aligned with aerial photo
  const [parkingSpots] = useState<ParkingSpot[]>([
    { id: 1, coordinates: [[11.497222014268198, 111.45364583333333], [105.6972220142682, 111.45364583333333], [107.00555534760154, 148.08697916666665], [11.497222014268198, 149.3953125]], isAvailable: true },
    { id: 2, coordinates: [[11.497222014268203, 158.55364583333335], [108.31388868093487, 155.93697916666665], [110.93055534760154, 197.80364583333332], [14.391666666666652, 197.69166666666666]], isAvailable: true },
    { id: 3, coordinates: [[11.497222014268193, 206.96197916666665], [109.6222220142682, 206.96197916666665], [109.6222220142682, 248.8286458333333], [12.805555347601532, 248.82864583333333]], isAvailable: true },
    { id: 4, coordinates: [[11.497222014268203, 254.06197916666662], [113.5472220142682, 255.37031249999998], [113.5472220142682, 298.54531249999997], [12.805555347601533, 301.16197916666664]], isAvailable: true },
    { id: 5, coordinates: [[10.188888680934864, 302.4703125], [107.00555534760154, 301.16197916666664], [105.6972220142682, 344.33697916666665], [10.188888680934864, 346.9536458333333]], isAvailable: true },
    { id: 6, coordinates: [[11.497222014268196, 350.8786458333333], [104.38888868093488, 348.2619791666666], [105.6972220142682, 392.74531249999995], [11.497222014268198, 394.05364583333323]], isAvailable: true },
    { id: 7, coordinates: [[14.113888680934863, 399.28697916666664], [104.38888868093488, 399.28697916666664], [104.38888868093488, 438.53697916666664], [13.00833333333333, 441.37499999999994]], isAvailable: true },
    { id: 8, coordinates: [[7.572222014268198, 442.4619791666666], [103.08055534760153, 443.7703125], [105.6972220142682, 484.32864583333327], [8.333333333333329, 484.3083333333332]], isAvailable: true },
    { id: 9, coordinates: [[12.805555347601532, 489.5619791666666], [105.69722201426819, 489.5619791666666], [107.00555534760153, 528.8119791666666], [12.805555347601532, 531.4286458333333]], isAvailable: true },
    { id: 10, coordinates: [[12.805555347601532, 535.3536458333333], [107.00555534760154, 532.7369791666666], [108.31388868093487, 577.2203125], [12.805555347601532, 579.8369791666667]], isAvailable: true },
    { id: 11, coordinates: [[107.00555534760154, 625.6286458333333], [12.805555347601532, 628.2453125], [12.805555347601508, 582.4536458333333], [107.00555534760154, 578.5286458333334]], isAvailable: true },
    { id: 12, coordinates: [[109.6222220142682, 675.3453125], [14.113888680934865, 676.6536458333333], [13.024999999999974, 631.975], [108.31388868093487, 629.5536458333332]], isAvailable: true },
    { id: 13, coordinates: [[110.93055534760154, 721.1369791666666], [11.497222014268198, 725.0619791666666], [12.805555347601548, 680.5786458333332], [109.62222201426822, 677.9619791666665]], isAvailable: true },
    { id: 14, coordinates: [[110.93055534760154, 770.8536458333333], [10.188888680934864, 773.4703125], [8.88055534760153, 731.6036458333333], [110.93055534760154, 727.6786458333332]], isAvailable: true },
    { id: 15, coordinates: [[144.94722201426822, 18.561979166666667], [147.56388868093487, 108.83697916666667], [107.00555534760154, 106.22031249999999], [101.77222201426821, 17.253645833333334]], isAvailable: true },
    { id: 16, coordinates: [[192.04722201426821, 17.253645833333334], [194.6638886809349, 111.45364583333333], [151.38333333333333, 107.84166666666667], [147.56388868093487, 17.253645833333334]], isAvailable: true },
    { id: 17, coordinates: [[241.76388868093488, 19.870312499999997], [241.76388868093488, 112.76197916666666], [199.8972220142682, 108.83697916666667], [198.58888868093487, 19.870312499999997]], isAvailable: true },
    { id: 18, coordinates: [[288.8638886809349, 22.486979166666664], [287.55555534760157, 114.07031249999999], [246.9972220142682, 111.45364583333333], [246.9972220142682, 22.486979166666664]], isAvailable: true },
    { id: 19, coordinates: [[339.8888886809349, 19.870312499999997], [337.2722220142682, 114.07031249999999], [294.0972220142682, 116.68697916666666], [294.0972220142682, 19.870312499999997]], isAvailable: true },
    { id: 20, coordinates: [[385.68055534760157, 17.253645833333334], [385.68055534760157, 112.76197916666666], [343.8138886809349, 107.52864583333333], [345.12222201426823, 14.636979166666666]], isAvailable: true },
    { id: 21, coordinates: [[435.3972220142682, 14.636979166666666], [435.3972220142682, 114.07031249999999], [390.9138886809349, 114.07031249999999], [390.9138886809349, 15.945312499999998]], isAvailable: true },
    { id: 22, coordinates: [[483.80555534760157, 15.945312499999998], [482.49722201426823, 112.76197916666666], [440.63055534760156, 114.07031249999999], [440.63055534760156, 14.636979166666666]], isAvailable: true },
    { id: 23, coordinates: [[530.9055553476016, 17.25364583333333], [530.9055553476016, 112.76197916666666], [487.7305553476016, 111.45364583333333], [487.7305553476016, 17.25364583333333]], isAvailable: true },
    { id: 24, coordinates: [[579.313888680935, 14.636979166666663], [578.0055553476016, 112.76197916666666], [534.8305553476016, 111.45364583333333], [537.4472220142683, 15.945312499999996]], isAvailable: true },
    { id: 25, coordinates: [[629.0305553476015, 10.711979166666666], [629.0305553476015, 112.76197916666666], [584.5472220142682, 114.07031249999999], [585.8555553476016, 12.0203125]], isAvailable: true },
    { id: 26, coordinates: [[720.613888680935, 9.403645833333332], [723.2305553476017, 116.68697916666666], [676.1305553476017, 116.68697916666666], [673.513888680935, 9.403645833333332]], isAvailable: true },
    { id: 27, coordinates: [[728.463888680935, 12.0203125], [725.8472220142684, 111.45364583333333], [767.713888680935, 111.45364583333333], [770.3305553476017, 12.0203125]], isAvailable: true },
    { id: 28, coordinates: [[817.4305553476016, 14.636979166666666], [817.4305553476016, 111.45364583333333], [775.563888680935, 111.45364583333333], [775.563888680935, 14.636979166666666]], isAvailable: true },
    { id: 29, coordinates: [[865.838888680935, 14.636979166666666], [865.838888680935, 110.14531249999999], [822.663888680935, 108.83697916666667], [822.663888680935, 15.945312499999986]], isAvailable: true },
    { id: 30, coordinates: [[919.4805553476017, 13.328645833333333], [919.4805553476017, 106.22031249999999], [874.9972220142683, 107.52864583333333], [873.6888886809351, 12.020312500000017]], isAvailable: true },
    { id: 31, coordinates: [[215.59722201426823, 613.8536458333333], [325.49722201426823, 615.1619791666666], [332.0388886809349, 662.2619791666666], [214.2888886809349, 663.5703125]], isAvailable: true },
    { id: 32, coordinates: [[218.21388868093487, 560.2119791666667], [322.88055534760156, 561.5203124999999], [325.49722201426823, 611.2369791666666], [218.21388868093487, 611.2369791666666]], isAvailable: true },
    { id: 33, coordinates: [[220.83055534760155, 510.49531249999995], [324.1888886809349, 511.8036458333333], [326.80555534760157, 558.9036458333333], [220.83055534760155, 557.5953125]], isAvailable: true },
    { id: 34, coordinates: [[219.5222220142682, 463.3953125], [322.88055534760156, 462.08697916666665], [322.88055534760156, 509.1869791666666], [219.5222220142682, 509.1869791666666]], isAvailable: true }
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Parking duration options with pricing
  const durationOptions = useMemo(() => [
    { value: '1', label: '1 Hour', price: 5 },
    { value: '2', label: '2 Hours', price: 9 },
    { value: '4', label: '4 Hours', price: 16 },
    { value: '8', label: 'All Day (8 Hours)', price: 25 }
  ], []);

  // Update price when duration changes
  useEffect(() => {
    if (selectedDuration) {
      const option = durationOptions.find(opt => opt.value === selectedDuration);
      setSelectedPrice(option?.price || 0);
    } else {
      setSelectedPrice(0);
    }
  }, [selectedDuration, durationOptions]);

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

  // Validate form
  const isFormValid = () => {
    return selectedSpot && selectedDuration && selectedPrice > 0 && 
           email.trim() !== '' && phone.trim() !== '' && licensePlate.trim() !== '';
  };

  // Handle continue to payment
  const handleContinueToPayment = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Creating payment session...');
      const response = await fetch('http://localhost:3001/api/create-payment', {
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
          smsReminders
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
            <Link to="/book/lumber-building" className="nav-link active">Book Now</Link>
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

      {/* Booking Header */}
      <div style={{ 
        marginTop: '100px',
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
{isMobile ? 'Choose your parking spot to see the exact space boundaries highlighted' : 'Select your parking spot from the dropdown to see the exact parking space boundaries highlighted in blue'}
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
            {Array.from({ length: 34 }, (_, i) => i + 1).map(spotNumber => (
              <option key={spotNumber} value={spotNumber}>
                Spot {spotNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Selector */}
        {selectedSpot && (
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
              Select Parking Duration:
            </label>
            
            <select
              value={selectedDuration}
              onChange={(e) => handleDurationSelect(e.target.value)}
              style={{
                fontSize: isMobile ? '18px' : '16px',
                padding: isMobile ? '12px 20px' : '10px 16px',
                borderRadius: '8px',
                border: '2px solid #ddd',
                backgroundColor: 'white',
                color: '#2c3e50',
                fontWeight: '500',
                minWidth: isMobile ? '200px' : '180px',
                minHeight: isMobile ? '48px' : '40px',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <option value="">Choose duration</option>
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - ${option.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Contact Information */}
        {/*selectedSpot && selectedDuration && ( */ }
          <div style={{
            margin: isMobile ? '20px 10px' : '30px 0',
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
                  onChange={(e) => setPhone(e.target.value)}
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
                  I agree to receive an SMS alert from Parqit-AI 15 minutes before my parking session expires. Message & data rates may apply. Reply STOP to opt-out.
                </label>
              </div>
            </div>
          </div>
        {/*)}*/}

        {/* Selection Status */}
        {selectedSpot && selectedDuration && isFormValid() && (
          <div style={{ 
            margin: isMobile ? '10px 10px' : '15px 0'
          }}>
            <div style={{
              backgroundColor: '#e8f5e8',
              color: '#2e7d32',
              border: '2px solid #4caf50',
              padding: isMobile ? '12px 20px' : '15px 25px',
              borderRadius: '12px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(76, 175, 80, 0.15)',
              textAlign: 'center'
            }}>
              Spot #{selectedSpot} • {durationOptions.find(opt => opt.value === selectedDuration)?.label} • ${selectedPrice}
              <br />
              <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '500' }}>
                {licensePlate.toUpperCase()} • {email}
              </span>
              <br />
              <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '500' }}>
                Ready for checkout
              </span>
            </div>
          </div>
        )}

        {/* Parking Map */}
        <div style={{ 
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

        {/* Continue Button */}
        {selectedSpot && selectedDuration && selectedPrice > 0 && (
          <button
            onClick={handleContinueToPayment}
            disabled={!isFormValid() || isLoading}
            style={{
              backgroundColor: !isFormValid() || isLoading ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              padding: isMobile ? '16px 30px' : '18px 45px',
              borderRadius: '12px',
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              cursor: !isFormValid() || isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)',
              transition: 'all 0.3s ease',
              marginTop: isMobile ? '15px' : '20px',
              minHeight: isMobile ? '48px' : 'auto',
              width: isMobile ? '90%' : 'auto',
              maxWidth: isMobile ? '320px' : 'none',
              opacity: !isFormValid() || isLoading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (isFormValid() && !isLoading) {
                e.currentTarget.style.backgroundColor = '#45a049';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(76, 175, 80, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (isFormValid() && !isLoading) {
                e.currentTarget.style.backgroundColor = '#4CAF50';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(76, 175, 80, 0.3)';
              }
            }}
          >
            {isLoading ? 'Creating Checkout Session...' : 'Continue to Payment'}
          </button>
        )}

        {/* Footer Info */}
        <div style={{ 
          marginTop: isMobile ? '25px' : '40px', 
          fontSize: isMobile ? '13px' : '14px', 
          color: '#6c757d',
          maxWidth: isMobile ? '95%' : '600px',
          lineHeight: '1.6',
          padding: isMobile ? '0 10px' : '0'
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