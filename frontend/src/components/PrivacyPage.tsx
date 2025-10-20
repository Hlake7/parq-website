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
          <p className="last-updated">Effective Date: August 1, 2025</p>

          <div className="legal-section">
            <h2>1. Introduction and Scope</h2>
            <p>
              PARQIT LLC ("PARQIT," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile parking service application (the "Service" or "App").
            </p>
            <p>
              <strong>Our Privacy-by-Design Approach:</strong> We have built our Service with privacy as a fundamental principle. We collect only the minimum information necessary to provide our parking services, and we employ anonymous tracking methods to protect your identity while ensuring compliance with parking regulations.
            </p>
            <p>
              This Privacy Policy applies to all users of our Service in Utah and governs our collection and use of your information. By completing a transaction through Stripe checkout, you consent to the data practices described in this Privacy Policy.
            </p>
            <p><strong>Key Privacy Highlights:</strong></p>
            <ul>
              <li>We do NOT store license plate numbers beyond 30 days</li>
              <li>We do NOT collect personal identification beyond payment requirements</li>
              <li>We use anonymous violation tracking</li>
              <li>We automatically delete validation records after 30 days</li>
              <li>You maintain full control over your data</li>
              <li>We operate exclusively within Utah with no international data processing</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. Our Role as Agent</h2>
            <p>
              PARQIT operates as an authorized agent and service provider for property owners and managers throughout Utah. When you use our Service, you are parking on private property owned by third parties who have contracted with us to manage parking compliance and enforcement.
            </p>
            <p>
              <strong>Agent Relationship:</strong> In our capacity as an agent, we act on behalf of property owners to monitor parking compliance, process violations, and coordinate enforcement actions. We may share certain parking-related information with property owners as necessary to fulfill our contractual obligations and ensure proper parking management.
            </p>
            <p>
              <strong>Service Limitations:</strong> PARQIT is not a security company, law enforcement agency, or general surveillance service. We are exclusively a parking management technology provider. We do not monitor, collect, or report information about illegal activities, criminal behavior, or any non-parking related activities that may occur on property owner premises.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Information We Collect</h2>

            <h3>Personal Information We Collect</h3>
            <p><strong>Payment Information (via Stripe)</strong></p>
            <ul>
              <li>Email addresses (for payment confirmation, receipts, and reservation communications)</li>
              <li>Phone numbers (for reservation confirmations, expiration warnings, and violation notifications)</li>
              <li>Payment method information (processed securely by Stripe; we do not store payment card details)</li>
            </ul>

            <p><strong>Parking Information</strong></p>
            <ul>
              <li>License plate numbers (for violation detection and enforcement purposes only)</li>
              <li>Selected parking space numbers</li>
              <li>Parking duration selections and time preferences</li>
              <li>Reservation timestamps and parking validation data</li>
            </ul>

            <h3>Information We Do NOT Collect</h3>
            <p>To protect your privacy, we explicitly do NOT collect:</p>
            <ul>
              <li>Personal identification documents</li>
              <li>Driver's license information</li>
              <li>Vehicle registration details</li>
              <li>Security surveillance data or general monitoring information</li>
              <li>Information about illegal activities or criminal behavior</li>
              <li>Data about non-parking related activities occurring on property premises</li>
            </ul>

            <h3>Third-Party Service Providers</h3>
            <p><strong>Stripe (Payment Processing)</strong></p>
            <ul>
              <li>We use Stripe to process payments securely</li>
              <li>Stripe's handling of your payment information is governed by their privacy policy</li>
            </ul>

            <p><strong>Twilio (Messaging Service)</strong></p>
            <ul>
              <li>We use Twilio to send reservation confirmations, expiration warnings, and violation notifications</li>
              <li>Twilio's handling of your messaging data is governed by their privacy policy</li>
            </ul>

            <p><strong>Microsoft Azure (Cloud Infrastructure)</strong></p>
            <ul>
              <li>Our Service operates on Microsoft Azure cloud infrastructure within the United States</li>
              <li>Data is stored in secure US-based data centers</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. How We Use Your Information</h2>

            <h3>Primary Service Functions</h3>
            <ul>
              <li>Payment Processing: To process parking payments securely through Stripe</li>
              <li>Parking Validation: To verify authorized parking and detect violations</li>
              <li>Service Delivery: To provide real-time parking space availability and management</li>
              <li>Reservation Communications: To communicate with you about your parking reservations, including confirmations, expiration warnings, and violation notifications</li>
            </ul>

            <h3>Limited Communication Scope</h3>
            <p>
              Your email address and phone number will NOT be used for any purpose other than parking reservation communications. We do not use your contact information for marketing, promotional communications, or any other commercial purposes beyond essential parking service notifications.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Information Sharing and Disclosure</h2>
            <p>
              We are committed to protecting your privacy and do not sell, trade, or otherwise transfer your personal information to third parties except as described below:
            </p>

            <h3>Property Owner Data Sharing</h3>
            <p>We share only relevant parking information with property owners we represent, including:</p>
            <ul>
              <li>Parking space usage data (space number, duration, and timing)</li>
              <li>License plate numbers for violation detection and enforcement purposes only</li>
              <li>Violation notifications and compliance status</li>
              <li>Payment confirmation status (paid/unpaid) without financial details</li>
            </ul>

            <p><strong>Information NOT Shared with Property Owners:</strong></p>
            <ul>
              <li>Your payment method or financial information</li>
              <li>Your personal contact details (email or phone number) except as required for enforcement</li>
              <li>Device information or app usage data</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Parking Enforcement Process</h2>
            <p>
              <strong>Violation Detection:</strong> When our system detects a potential parking violation (unauthorized vehicle or expired reservation), we notify the relevant property owner with minimal necessary information including the license plate number, space location, and time of violation.
            </p>
            <p>
              <strong>Property Owner Discretion:</strong> Each property owner has full discretion over enforcement policies and procedures. Enforcement actions may vary by property and may include warning notifications, monetary penalties, vehicle immobilization (booting), vehicle towing, or other enforcement measures.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Data Security</h2>
            <p>We implement comprehensive security measures to protect your information:</p>

            <h3>Technical Safeguards</h3>
            <ul>
              <li>Encryption: All data transmission is encrypted using industry-standard protocols</li>
              <li>Azure Enterprise Security: We leverage Microsoft Azure's enterprise-grade security infrastructure</li>
              <li>Secure APIs: All API communications use authenticated and encrypted connections</li>
              <li>Access Controls: Strict access controls limit who can view your information</li>
            </ul>

            <h3>Privacy Engineering</h3>
            <ul>
              <li>Anonymous Tracking: Violation detection systems operate with minimal personal identifiers</li>
              <li>Retention Limits: Automatic enforcement of data retention policies</li>
              <li>Privacy by Design: Security and privacy controls built into every aspect of our Service</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>8. Data Breach Notification</h2>
            <p>
              In the event of a data security incident that affects your personal information, we will notify you directly via email within 30 days of discovering the breach. Our notification will include:
            </p>
            <ul>
              <li>Description of what information was involved</li>
              <li>Steps we are taking to address the breach</li>
              <li>Recommended actions you can take to protect yourself</li>
              <li>Contact information for questions about the incident</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>9. Your Privacy Rights and Choices</h2>
            <p>You have control over your personal information and may exercise the following rights:</p>

            <h3>Universal Rights (All Users)</h3>
            <ul>
              <li>View Your Data: Request access to personal information we have about you</li>
              <li>Update Information: Correct or update inaccurate personal information</li>
              <li>Delete Data: Request complete deletion of your information</li>
              <li>Export Data: Request a copy of your payment history and parking information</li>
            </ul>

            <p>
              To exercise any of these rights, please contact us at pleaseparq@gmail.com with "Data Request" in the subject line. We will respond within 30 days.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Data Retention</h2>
            <p>We retain your information only as long as necessary to provide our services and comply with legal obligations:</p>

            <h3>Retention Periods</h3>
            <ul>
              <li>Payment Records: Retained as required for tax and business purposes (typically 7 years)</li>
              <li>Validation Records: Automatically deleted after 30 days</li>
              <li>License Plate Information: Retained for 30 days maximum</li>
              <li>Communication Records: Text and email delivery confirmations retained for 30 days</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>11. Legal Basis for Processing</h2>
            <p>We process your personal information based on the following legal grounds:</p>
            <ul>
              <li><strong>Performance of Contract:</strong> To fulfill our parking service agreement with you</li>
              <li><strong>Legitimate Interests:</strong> For parking enforcement and property security purposes</li>
              <li><strong>Consent:</strong> By completing checkout through Stripe, you provide consent for us to process your information as described in this Privacy Policy</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable Utah state laws</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>12. Consent and Data Processing</h2>
            <p>
              <strong>Checkout Consent:</strong> By completing a transaction through Stripe checkout, you provide explicit consent for PARQIT to collect, process, and use your information as described in this Privacy Policy.
            </p>
            <p>
              <strong>Communication Consent:</strong> Your checkout process includes consent to receive parking-related communications via email and text message. These communications are essential to our service delivery.
            </p>
          </div>

          <div className="legal-section">
            <h2>13. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at pleaseparq@gmail.com.
            </p>
          </div>

          <div className="legal-section">
            <h2>14. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
            </p>

            <h3>How We Notify You of Changes</h3>
            <p><strong>Material Changes:</strong></p>
            <ul>
              <li>Prominent notice through the App</li>
              <li>Email notification to registered users</li>
              <li>At least 30 days advance notice before material changes take effect</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>15. Contact Information</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <p>
              <strong>PARQIT LLC</strong><br />
              Email: pleaseparq@gmail.com
            </p>
            <p>
              <strong>Privacy Inquiries:</strong> For privacy-specific questions or data access requests, please email us at pleaseparq@gmail.com with "Privacy Request" or "Data Request" in the subject line.
            </p>
            <p><strong>Response Time:</strong> We will respond to privacy inquiries within 30 days of receipt.</p>
          </div>

          <div className="legal-section">
            <h2>Legal Information</h2>
            <p>
              <strong>Governing Law:</strong> This Privacy Policy is governed by the laws of the State of Utah and applicable federal laws.
            </p>
            <p>
              <strong>Severability:</strong> If any provision of this Privacy Policy is found to be unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </div>

          <div className="legal-disclaimer">
            <p>
              Last Updated: August 1, 2025<br />
              Version: 2.0
            </p>
            <p>&copy; 2025 PARQIT LLC. All rights reserved.</p>
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