import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BusinessPages.css';

const AboutPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScheduleDemoClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="about-page">
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
            <Link to="/about" className="nav-link active">About</Link>
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
      <section className="page-hero">
        <div className="container">
          <div className="overline">Our Story</div>
          <h1 className="page-title">About Parq AI</h1>
          <p className="page-subtitle">
            We're transforming parking management through
            intelligent automation and computer vision.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p className="large-text">
                To revolutionize parking management by eliminating inefficiencies, 
                increasing revenue, and creating seamless experiences through 
                artificial intelligence.
              </p>
              <p>
                Traditional parking management is broken. Property owners lose thousands 
                in revenue due to poor compliance monitoring, while manual enforcement 
                is costly, inconsistent, and time-consuming. We believe there's a better way.
              </p>
            </div>
            <div className="mission-visual">
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-number">90%</div>
                  <div className="stat-label">Reduction in Manual Work</div>
                </div>
                <div className="stat">
                  <div className="stat-number">35%</div>
                  <div className="stat-label">Average Revenue Increase</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Automated Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="innovation-section">
        <div className="container">
          <h2 className="section-title">Why Our AI Approach is Different</h2>
          <div className="innovation-grid">
            <div className="innovation-card">
              <div className="innovation-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                </div>
              </div>
              <h3>Computer Vision Excellence</h3>
              <p>
                Our proprietary AI models are trained on millions of parking scenarios,
                achieving 99.2% accuracy in vehicle detection and violation identification.
              </p>
            </div>
            <div className="innovation-card">
              <div className="innovation-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
              </div>
              <h3>Real-time Processing</h3>
              <p>
                Edge computing technology processes data instantly, enabling
                immediate responses and notifications without cloud delays.
              </p>
            </div>
            <div className="innovation-card">
              <div className="innovation-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                  </svg>
                </div>
              </div>
              <h3>Continuous Learning</h3>
              <p>
                Our AI systems continuously improve by learning from each property's
                unique patterns, weather conditions, and traffic flows.
              </p>
            </div>
            <div className="innovation-card">
              <div className="innovation-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              </div>
              <h3>Privacy-First Design</h3>
              <p>
                Built with enterprise security standards, ensuring all data is
                encrypted and processed in compliance with privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Innovation First</h3>
              <p>We push the boundaries of what's possible with AI to solve real-world problems.</p>
            </div>
            <div className="value-item">
              <h3>Customer Success</h3>
              <p>Your success is our success. We measure our impact by your results.</p>
            </div>
            <div className="value-item">
              <h3>Transparency</h3>
              <p>Clear communication, honest metrics, and open about our capabilities and limitations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Parking?</h2>
            <p>Let's discuss how Parq AI can increase your revenue and reduce operational overhead.</p>
            <button onClick={handleScheduleDemoClick} className="btn-primary large">
              Schedule a Demo
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

export default AboutPage;