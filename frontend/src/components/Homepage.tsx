import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BusinessPages.css';

const Homepage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <svg width="120" height="32" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(18,24) rotate(45) translate(-18,-12)">
                <line x1="6" y1="0" x2="6" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="18" y1="0" x2="18" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="30" y1="0" x2="30" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="6" x2="36" y2="6" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="18" x2="36" y2="18" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="30" cy="18" r="3" fill="#00C2B7"/>
              </g>
              <text x="52" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="28" letterSpacing="-0.02em" fill="#F5F6F8">Parq</text>
              <text x="127" y="32" fontFamily="JetBrains Mono, monospace" fontWeight="500" fontSize="18" letterSpacing="0.05em" fill="#00C2B7">AI</text>
            </svg>
          </Link>

          {/* Desktop Menu */}
          <div className="nav-menu desktop-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/book/lumber-building" className="nav-cta">Demo</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-menu">
              <div className="mobile-menu-header">
                <Link to="/" className="mobile-nav-logo" onClick={closeMobileMenu}>
                  <svg width="120" height="32" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(18,24) rotate(45) translate(-18,-12)">
                      <line x1="6" y1="0" x2="6" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="18" y1="0" x2="18" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="30" y1="0" x2="30" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="0" y1="6" x2="36" y2="6" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="0" y1="18" x2="36" y2="18" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="30" cy="18" r="3" fill="#00C2B7"/>
                    </g>
                    <text x="52" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="28" letterSpacing="-0.02em" fill="#F5F6F8">Parq</text>
                    <text x="127" y="32" fontFamily="JetBrains Mono, monospace" fontWeight="500" fontSize="18" letterSpacing="0.05em" fill="#00C2B7">AI</text>
                  </svg>
                </Link>
                <button
                  className="mobile-menu-close"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="mobile-nav-links">
                <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
                <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
                <Link to="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</Link>
                <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
                <Link to="/privacy" className="mobile-nav-link" onClick={closeMobileMenu}>Privacy Policy</Link>
                <Link to="/terms" className="mobile-nav-link" onClick={closeMobileMenu}>Terms of Service</Link>
                <Link to="/book/lumber-building" className="mobile-nav-cta" onClick={closeMobileMenu}>Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="overline">Autonomous Compliance</div>
            <h1 className="hero-title">
              Every spot. Every hour.
              <span className="text-teal"> Every time.</span>
            </h1>
            <p className="hero-subtitle">
              Parq AI replaces manual parking enforcement with computer vision that
              monitors every space, detects violations instantly, and automates the
              entire compliance workflow.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn-primary">
                Explore Solutions
              </Link>
              <Link to="/book/lumber-building" className="btn-secondary">
                Try Demo
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="tech-grid">
              <div className="tech-item">AI Detection</div>
              <div className="tech-item">Real-time Analytics</div>
              <div className="tech-item">Automated Enforcement</div>
              <div className="tech-item">Revenue Optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Parq AI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </div>
              <h3>AI-Powered Monitoring</h3>
              <p>Advanced computer vision technology automatically detects violations, license plates, and occupancy patterns 24/7.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
              </div>
              <h3>Automated Enforcement</h3>
              <p>Reduce manual oversight by 90%. Our AI handles compliance monitoring, notifications, and violation processing automatically.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
              </div>
              <h3>Revenue Optimization</h3>
              <p>Increase parking revenue by up to 35% through better compliance rates and data-driven pricing optimization.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                  </svg>
                </div>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Get actionable insights with live dashboards showing occupancy rates, revenue trends, and compliance metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Parking Operations?</h2>
            <p>Join property owners who have already increased their parking revenue with Parq AI.</p>
            <button onClick={handleGetStartedClick} className="btn-primary large">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <svg width="100" height="28" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(18,24) rotate(45) translate(-18,-12)">
                  <line x1="6" y1="0" x2="6" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="18" y1="0" x2="18" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="30" y1="0" x2="30" y2="24" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="0" y1="6" x2="36" y2="6" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="0" y1="18" x2="36" y2="18" stroke="#F5F6F8" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="30" cy="18" r="3" fill="#00C2B7"/>
                </g>
                <text x="52" y="32" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="28" letterSpacing="-0.02em" fill="#F5F6F8">Parq</text>
                <text x="127" y="32" fontFamily="JetBrains Mono, monospace" fontWeight="500" fontSize="18" letterSpacing="0.05em" fill="#00C2B7">AI</text>
              </svg>
              <p>Autonomous parking compliance for modern property owners.</p>
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

export default Homepage;