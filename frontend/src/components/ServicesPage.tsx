import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BusinessPages.css';

const ServicesPage: React.FC = () => {
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

  const handleServiceCardClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="services-page">
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
            <Link to="/services" className="nav-link active">Services</Link>
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
          <div className="overline">Our Solutions</div>
          <h1 className="page-title">AI-Powered Solutions</h1>
          <p className="page-subtitle">
            Comprehensive parking management that increases revenue,
            reduces costs, and eliminates manual oversight.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="services-overview">
        <div className="container">
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </div>
              <h2>AI Compliance Monitoring</h2>
              <p className="service-description">
                Automated 24/7 monitoring with computer vision technology that detects 
                violations, unauthorized vehicles, and occupancy patterns with 99.2% accuracy.
              </p>
              <ul className="service-features">
                <li>Real-time violation detection</li>
                <li>License plate recognition</li>
                <li>Occupancy tracking</li>
                <li>Weather-adaptive monitoring</li>
                <li>Custom rule configuration</li>
              </ul>
            </div>

            <div className="service-card featured">
              <div className="service-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
              </div>
              <h2>Automated Enforcement</h2>
              <p className="service-description">
                Intelligent enforcement system that handles notifications, citations, 
                and follow-up actions automatically, reducing manual work by 90%.
              </p>
              <ul className="service-features">
                <li>Automated violation notices</li>
                <li>Progressive enforcement workflows</li>
                <li>Multi-channel notifications (SMS, email)</li>
                <li>Appeal management system</li>
                <li>Integration with towing services</li>
              </ul>
            </div>

            <div className="service-card featured">
              <div className="service-icon">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                  </svg>
                </div>
              </div>
              <h2>Real-time Analytics Dashboard</h2>
              <p className="service-description">
                Comprehensive analytics platform providing actionable insights 
                into parking patterns, revenue optimization, and operational efficiency.
              </p>
              <ul className="service-features">
                <li>Live occupancy monitoring</li>
                <li>Revenue tracking & forecasting</li>
                <li>Compliance rate analytics</li>
                <li>Peak usage identification</li>
                <li>Custom reporting suite</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Benefits for Property Owners</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-metric">35%</div>
              <h3>Average Revenue Increase</h3>
              <p>Better compliance rates and optimized pricing drive significant revenue growth.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-metric">90%</div>
              <h3>Reduction in Manual Work</h3>
              <p>Automated monitoring and enforcement eliminate most manual oversight tasks.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-metric">24/7</div>
              <h3>Continuous Monitoring</h3>
              <p>AI never sleeps - constant surveillance ensures no violations go undetected.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-metric">99.2%</div>
              <h3>Detection Accuracy</h3>
              <p>Industry-leading AI models minimize false positives and missed violations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="technology-section">
        <div className="container">
          <h2 className="section-title">Advanced Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Computer Vision</h3>
              <div className="tech-items">
                <div className="tech-item">Proprietary AI Vision Model</div>
                <div className="tech-item">Custom CNN Models</div>
                <div className="tech-item">Real-time Video Processing</div>
                <div className="tech-item">Multi-camera Fusion</div>
              </div>
            </div>
            <div className="tech-category">
              <h3>Machine Learning</h3>
              <div className="tech-items">
                <div className="tech-item">TensorFlow & PyTorch</div>
                <div className="tech-item">Edge Computing Optimization</div>
                <div className="tech-item">Continuous Learning Pipeline</div>
                <div className="tech-item">Behavioral Pattern Analysis</div>
              </div>
            </div>
            <div className="tech-category">
              <h3>Infrastructure</h3>
              <div className="tech-items">
                <div className="tech-item">Cloud-Native Architecture</div>
                <div className="tech-item">Edge Device Management</div>
                <div className="tech-item">Real-time Data Streaming</div>
                <div className="tech-item">Enterprise Security Standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="implementation-section">
        <div className="container">
          <h2 className="section-title">Implementation Process</h2>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Site Assessment</h3>
                <p>Our team evaluates your property and designs a custom AI monitoring solution.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Hardware Installation</h3>
                <p>Professional installation of cameras and edge computing devices with minimal disruption.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>AI Training & Calibration</h3>
                <p>Custom AI model training for your specific property layout and requirements.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Go Live & Support</h3>
                <p>Full system activation with ongoing monitoring, updates, and technical support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Service Options</h2>
          <div className="pricing-grid">
            <div onClick={handleServiceCardClick} className="pricing-card" style={{ cursor: 'pointer' }}>
              <h3>Starter</h3>
              <div className="price">Contact for Pricing</div>
              <p>Perfect for small properties and pilot programs</p>
              <ul>
                <li>Up to 50 parking spots</li>
                <li>Basic AI monitoring</li>
                <li>Email notifications</li>
                <li>Standard analytics</li>
                <li>Business hours support</li>
              </ul>
            </div>
            <div onClick={handleServiceCardClick} className="pricing-card" style={{ cursor: 'pointer' }}>
              <h3>Professional</h3>
              <div className="price">Contact for Pricing</div>
              <p>Comprehensive solution for most properties</p>
              <ul>
                <li>Up to 200 parking spots</li>
                <li>Advanced AI monitoring</li>
                <li>Multi-channel notifications</li>
                <li>Full analytics dashboard</li>
                <li>24/7 support</li>
              </ul>
            </div>
            <div onClick={handleServiceCardClick} className="pricing-card" style={{ cursor: 'pointer' }}>
              <h3>Enterprise</h3>
              <div className="price">Custom Quote</div>
              <p>Scalable solution for large properties and portfolios</p>
              <ul>
                <li>Unlimited parking spots</li>
                <li>Custom AI models</li>
                <li>API integrations</li>
                <li>Advanced reporting</li>
                <li>Dedicated account manager</li>
              </ul>
            </div>
          </div>
          <div className="pricing-note">
            <p>All plans include hardware, installation, training, and ongoing maintenance. 
            Contact us for a custom quote based on your specific requirements.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to See Parq AI in Action?</h2>
            <p>Schedule a personalized demo to see how our AI technology can transform your parking operations.</p>
            <button onClick={handleScheduleDemoClick} className="btn-primary large">
              Schedule Demo
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

export default ServicesPage;