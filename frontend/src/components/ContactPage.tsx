import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BusinessPages.css';

const ContactPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    propertySize: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        propertySize: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="contact-page">
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
            <Link to="/contact" className="nav-link active">Contact</Link>
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
          <div className="overline">Connect With Us</div>
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Ready to transform your parking operations? Let's discuss how
            Parq AI can increase your revenue and reduce operational costs.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Schedule a Demo</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  <p>Thank you for your interest! We'll be in touch within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company/Property Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="propertySize">Property Size</label>
                  <select
                    id="propertySize"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange}
                  >
                    <option value="">Select property size</option>
                    <option value="small">Small (Under 50 spots)</option>
                    <option value="medium">Medium (50-200 spots)</option>
                    <option value="large">Large (200-500 spots)</option>
                    <option value="enterprise">Enterprise (500+ spots)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell us about your parking challenges</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What parking management challenges are you facing? What's your current enforcement process?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Schedule Demo'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <div className="icon-circle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>
                    </svg>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>parqitai@gmail.com pleaseparq@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <div className="icon-circle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>Response Time</h4>
                  <p>We respond to all inquiries within 24 hours during business days.</p>
                </div>
              </div>

              {/* FAQs */}
              <div className="quick-faqs">
                <h3>Quick Answers</h3>
                <div className="faq-item">
                  <h4>How long does implementation take?</h4>
                  <p>Most installations are completed within 2-4 weeks, depending on property size.</p>
                </div>
                <div className="faq-item">
                  <h4>What's included in the setup?</h4>
                  <p>Everything: hardware, installation, AI training, staff training, and ongoing support.</p>
                </div>
                <div className="faq-item">
                  <h4>Do you offer trials?</h4>
                  <p>Yes! We offer 30-day pilot programs to demonstrate ROI before full deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prefer to See Our Technology First?</h2>
            <p>Try our live booking system to experience the user interface your customers will love.</p>
            <Link to="/book/lumber-building" className="btn-secondary large">
              Try Live Demo
            </Link>
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

export default ContactPage;