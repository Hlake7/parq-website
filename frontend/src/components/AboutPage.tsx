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
            <span className="logo-text">Parq</span>
            <span className="logo-tagline">AI</span>
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
                <Link to="/book/lumber-building" className="mobile-nav-cta" onClick={closeMobileMenu}>Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">About Parq AI</h1>
          <p className="page-subtitle">
            We're transforming the future of parking management through 
            intelligent automation and cutting-edge AI technology.
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
              <div className="innovation-icon">🔬</div>
              <h3>Computer Vision Excellence</h3>
              <p>
                Our proprietary AI models are trained on millions of parking scenarios, 
                achieving 99.2% accuracy in vehicle detection and violation identification.
              </p>
            </div>
            <div className="innovation-card">
              <div className="innovation-icon">⚡</div>
              <h3>Real-time Processing</h3>
              <p>
                Edge computing technology processes data instantly, enabling 
                immediate responses and notifications without cloud delays.
              </p>
            </div>
            <div className="innovation-card">
              <div className="innovation-icon">🧠</div>
              <h3>Continuous Learning</h3>
              <p>
                Our AI systems continuously improve by learning from each property's 
                unique patterns, weather conditions, and traffic flows.
              </p>
            </div>
            <div className="innovation-card">
              <div className="innovation-icon">🔒</div>
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

export default AboutPage;