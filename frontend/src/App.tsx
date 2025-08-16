import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { BookingPage, PaymentSuccess } from './components';

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
        <Route path="/" element={<BookingPage />} />
        <Route path="/success" element={<PaymentSuccess isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
}

export default App;
