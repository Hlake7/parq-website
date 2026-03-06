import React, { useEffect, useState } from 'react';

interface PaymentSuccessProps {
  isMobile?: boolean;
}

interface BookingDetails {
  status: string;
  spotId: string;
  duration: string;
  amount: number;
  email: string;
  phone: string;
  licensePlate: string;
  smsReminders: boolean;
  bookingDate: string;
  customerEmail: string;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ isMobile = false }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Get session ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        
        if (!sessionId) {
          throw new Error('No session ID found');
        }

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/payment-session/${sessionId}`);
        const data = await response.json();
        
        if (response.ok) {
          setBookingDetails(data);
        } else {
          throw new Error(data.error || 'Failed to fetch booking details');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  const getDurationLabel = (duration: string) => {
    const durationMap: { [key: string]: string } = {
      '1': '1 Hour',
      '2': '2 Hours', 
      '4': '4 Hours',
      '8': 'All Day (8 Hours)'
    };
    return durationMap[duration] || `${duration} Hours`;
  };

  if (loading) {
    return (
      <div style={{
        padding: isMobile ? '20px' : '40px',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: '#0A1628'
      }}>
        <h2 style={{ color: '#F5F6F8' }}>Processing your booking...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: isMobile ? '20px' : '40px',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: '#0A1628'
      }}>
        <h2 style={{ color: '#EF4444' }}>Booking Error</h2>
        <p style={{ color: '#8B92A7' }}>{error}</p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#00C2B7',
            color: '#0A1628',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Return to Booking
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: isMobile ? '20px' : '40px',
      textAlign: 'center',
      minHeight: '100vh',
      backgroundColor: '#0A1628'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#1A2540',
        padding: isMobile ? '30px 20px' : '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#00C2B7" strokeWidth="2" fill="rgba(0,194,183,0.1)"/>
            <polyline points="15 24 22 31 33 18" stroke="#00C2B7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        
        <h1 style={{
          color: '#F5F6F8',
          fontFamily: "'General Sans', sans-serif",
          marginBottom: '10px',
          fontSize: isMobile ? '24px' : '32px'
        }}>
          Booking Confirmed!
        </h1>

        <p style={{
          color: '#8B92A7',
          fontSize: isMobile ? '16px' : '18px',
          marginBottom: '30px'
        }}>
          Your parking reservation has been successfully processed.
        </p>

        {bookingDetails && (
          <div style={{
            backgroundColor: 'rgba(0, 194, 183, 0.08)',
            border: '2px solid rgba(0, 194, 183, 0.25)',
            borderRadius: '8px',
            padding: isMobile ? '20px' : '30px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: '#00C2B7',
              marginBottom: '15px',
              fontSize: isMobile ? '18px' : '20px'
            }}>
              Booking Details:
            </h3>

            <div style={{ lineHeight: '1.8', fontSize: isMobile ? '16px' : '18px', color: '#F5F6F8' }}>
              <p><strong>Parking Spot:</strong> #{bookingDetails.spotId}</p>
              <p><strong>Duration:</strong> {getDurationLabel(bookingDetails.duration)}</p>
              <p><strong>Amount Paid:</strong> <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>${bookingDetails.amount}</span></p>
              <p><strong>License Plate:</strong> {bookingDetails.licensePlate}</p>
              <p><strong>Email:</strong> {bookingDetails.email}</p>
              <p><strong>Phone:</strong> {bookingDetails.phone}</p>
              {bookingDetails.smsReminders && (
                <p><strong>SMS Reminders:</strong> <span style={{ color: '#00C2B7' }}>Enabled</span></p>
              )}
              <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
              <p><strong>Status:</strong> <span style={{ color: '#00C2B7' }}>Confirmed</span></p>
            </div>
          </div>
        )}

        <div style={{
          backgroundColor: 'rgba(0, 194, 183, 0.06)',
          border: '1px solid rgba(0, 194, 183, 0.2)',
          borderRadius: '8px',
          padding: isMobile ? '15px' : '20px',
          marginBottom: '30px'
        }}>
          <h4 style={{ color: '#00C2B7', marginBottom: '10px' }}>Important Information:</h4>
          <ul style={{
            textAlign: 'left',
            color: '#8B92A7',
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: '1.6'
          }}>
            <li>Please arrive within 15 minutes of your reserved time</li>
            <li>Your parking spot is highlighted on the map for easy identification</li>
            <li>Keep this confirmation for your records</li>
            <li>Contact support if you need to modify your reservation</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#00C2B7',
            color: '#0A1628',
            border: 'none',
            padding: isMobile ? '16px 30px' : '18px 40px',
            borderRadius: '8px',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 194, 183, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#00A89E';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#00C2B7';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Book Another Spot
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;