import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BusinessPages.css';

const ContactPage: React.FC = () => {
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
            <span className="logo-text">Parq</span>
            <span className="logo-tagline">AI</span>
          </Link>
          <div className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link active">Contact</Link>
            <Link to="/book/lumber-building" className="nav-cta">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
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
                  <p>✅ Thank you for your interest! We'll be in touch within 24 hours.</p>
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
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>parqitai@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏱️</div>
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

export default ContactPage;