import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { 
  BookingPage, 
  PaymentSuccess, 
  Homepage,
  AboutPage,
  ServicesPage,
  ContactPage,
  PrivacyPage,
  TermsPage 
} from './components';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Business Platform Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        
        {/* Property-specific booking routes */}
        <Route path="/book/lumber-building" element={<BookingPage />} />
        <Route path="/book/lumber-building/success" element={<PaymentSuccess isMobile={isMobile} />} />
        
        {/* Legacy redirects for existing bookings - redirect to lumber-building */}
        <Route path="/success" element={<PaymentSuccess isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
}

export default App;
