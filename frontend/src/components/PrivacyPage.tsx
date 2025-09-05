import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BusinessPages.css';

const PrivacyPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="privacy-page">
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
            <Link to="/book/lumber-building" className="nav-cta">Book Now</Link>
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

      {/* Content */}
      <section className="legal-content">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: December 2024</p>

          <div className="legal-section">
            <h2>Introduction</h2>
            <p>
              Parq AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our 
              website and use our AI-powered parking management services.
            </p>
          </div>

          <div className="legal-section">
            <h2>Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Company or property information</li>
              <li>Payment information for booking services</li>
              <li>License plate information for parking reservations</li>
              <li>Communication preferences</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you use our services, we automatically collect certain information:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Location information (if you consent to location services)</li>
              <li>Parking compliance data from our AI monitoring systems</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>How We Use Your Information</h2>
            <p>We use the collected information for various purposes:</p>
            <ul>
              <li>To provide and maintain our AI parking management services</li>
              <li>To process parking reservations and payments</li>
              <li>To send you service-related communications and updates</li>
              <li>To improve our AI models and service quality</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To comply with legal obligations and enforce our terms</li>
              <li>To detect and prevent fraud or security issues</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>AI and Computer Vision Data</h2>
            <p>
              Our AI-powered parking compliance system processes visual data to monitor parking areas. 
              This includes:
            </p>
            <ul>
              <li>Vehicle detection and tracking (anonymized)</li>
              <li>License plate recognition for authorized access verification</li>
              <li>Parking violation detection and documentation</li>
              <li>Occupancy pattern analysis for optimization</li>
            </ul>
            <p>
              All visual data is processed in accordance with privacy regulations. Personal identifying 
              information is encrypted and access is strictly limited to authorized personnel.
            </p>
          </div>

          <div className="legal-section">
            <h2>Information Sharing</h2>
            <p>We do not sell your personal information. We may share information in these circumstances:</p>
            <ul>
              <li>With service providers who assist in delivering our services</li>
              <li>With property owners/managers as necessary for parking management</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transaction (merger, acquisition, etc.)</li>
              <li>With your explicit consent</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information against unauthorized 
              access, alteration, disclosure, or destruction. Our security practices include:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication protocols</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>To exercise these rights, please contact us at privacy@parq-ai.com.</p>
          </div>

          <div className="legal-section">
            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience and analyze usage patterns. 
              You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div className="legal-section">
            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries outside your residence. 
              We ensure appropriate safeguards are in place for international transfers.
            </p>
          </div>

          <div className="legal-section">
            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children under 13 without parental consent.
            </p>
          </div>

          <div className="legal-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes 
              by posting the updated policy on our website and updating the "last updated" date.
            </p>
          </div>

          <div className="legal-section">
            <h2>Contact Information</h2>
            <p>For privacy-related questions or concerns, please contact us:</p>
            <ul>
              <li>Email: privacy@parq-ai.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Innovation Drive, San Francisco, CA 94107</li>
            </ul>
          </div>

          <div className="legal-disclaimer">
            <p>
              <em>
                This is a template privacy policy. Actual implementation should be reviewed by legal counsel 
                and customized based on specific business practices, applicable laws, and jurisdictional requirements.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Parq AI</h3>
              <p>Revolutionizing parking management through artificial intelligence.</p>
            </div>
            <div className="footer-section">
              <h4>Solutions</h4>
              <Link to="/services">AI Compliance</Link>
              <Link to="/services">Automated Enforcement</Link>
              <Link to="/services">Analytics Dashboard</Link>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Parq AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;