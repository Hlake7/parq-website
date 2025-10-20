import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BusinessPages.css';

const TermsPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="terms-page">
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
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Effective Date: August 1, 2025</p>

          <div className="legal-section">
            <h2>1. ACCEPTANCE OF TERMS</h2>
            <p>
              By using PARQIT's parking management services ("Service"), accessing our website, or making a parking reservation, you ("User" or "you") agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not use our Service.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. ABOUT PARQIT</h2>
            <p>
              PARQIT operates as an authorized agent and representative for private property owners and managers ("Property Partners") to provide parking compliance monitoring and reservation services. We are not a towing company, security company, or property owner. Our authority to manage parking spaces is granted through contractual agreements with Property Partners.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. SERVICE DESCRIPTION</h2>

            <h3>3.1 Parking Reservations</h3>
            <p>
              We provide a platform that allows users to reserve and pay for parking spaces on private properties managed by our Property Partners.
            </p>

            <h3>3.2 Compliance Monitoring</h3>
            <p>
              We monitor parking spaces to ensure that only authorized users occupy reserved or designated areas during specified times.
            </p>

            <h3>3.3 Payment Processing</h3>
            <p>
              All payments are processed through Stripe, our third-party payment processor. We do not store payment card information.
            </p>

            <h3>3.4 Communication Services</h3>
            <p>
              We use Twilio to send text message notifications regarding reservation confirmations, expiration warnings, and important updates about your parking session. Communication preferences and opt-out selections are managed during the Stripe checkout process where you can choose whether to receive notifications.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. USER OBLIGATIONS</h2>

            <h3>4.1 Accurate Information</h3>
            <p>
              You must provide accurate and complete information when creating reservations, including valid email address, phone number, and license plate information.
            </p>

            <h3>4.2 Compliance with Property Rules</h3>
            <p>
              You agree to park only in designated areas, comply with time limits, and follow all posted parking rules and regulations of the specific property where you park. Each property has unique rules and regulations that are posted on-site and take precedence over these general terms. You are responsible for observing and complying with all property-specific signage and requirements.
            </p>

            <h3>4.3 Vehicle Authorization</h3>
            <p>
              You represent that you are authorized to operate and park the vehicle for which you are making reservations.
            </p>

            <h3>4.4 Payment Obligations</h3>
            <p>
              You agree to pay all applicable fees for parking services and understand that parking without valid payment may result in violations and enforcement actions.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. PAYMENT TERMS</h2>

            <h3>5.1 Payment Processing</h3>
            <p>
              All payments are processed through Stripe. By using our Service, you agree to Stripe's terms of service and privacy policy.
            </p>

            <h3>5.2 Fees and Charges</h3>
            <p>
              Parking fees are determined by Property Partners and displayed during the reservation process. All fees are due at the time of reservation unless otherwise specified.
            </p>

            <h3>5.3 No Cancellations or Refunds</h3>
            <p>
              Parking reservations cannot be cancelled or modified once payment is processed. All sales are final. Users who park beyond their reserved time or park without valid payment do so at their own risk and may be subject to enforcement actions by Property Partners, including additional fees, citations, or towing.
            </p>

            <h3>5.4 Failed Payments</h3>
            <p>
              If payment fails or is declined, your reservation may be cancelled, and you may be subject to violation enforcement if you continue to occupy the parking space.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. LICENSE PLATE MONITORING AND ENFORCEMENT</h2>

            <h3>6.1 Monitoring Authority</h3>
            <p>
              We are authorized by Property Partners to monitor license plates and parking compliance within Utah state legal requirements.
            </p>

            <h3>6.2 Data Collection</h3>
            <p>
              We collect and process license plate information solely for parking compliance purposes and to fulfill our obligations to Property Partners.
            </p>

            <h3>6.3 Violation Detection</h3>
            <p>
              Unauthorized parking or overstaying reservations may result in violation notices, fees, or other enforcement actions as determined by Property Partners.
            </p>

            <h3>6.4 Enforcement Actions</h3>
            <p>
              Enforcement actions, including but not limited to fees, citations, or towing, are determined by Property Partners. PARQIT serves only as an information provider and monitoring agent.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. LIMITATIONS OF LIABILITY</h2>

            <h3>7.1 Service Availability and Technical Interruptions</h3>
            <p>
              We do not guarantee continuous availability of parking spaces or uninterrupted service operation. Technical interruptions, system failures, or other circumstances beyond our control may affect service availability. We will manually review any technical issues that may impact user parking sessions and take appropriate corrective action, including working with Property Partners to resolve enforcement matters that arise from system failures during valid paid parking periods.
            </p>

            <h3>7.2 Property Partner Actions</h3>
            <p>
              We are not liable for actions taken by Property Partners, including enforcement decisions, towing, or property-specific rules and regulations.
            </p>

            <h3>7.3 Vehicle Safety and Security</h3>
            <p>
              We do not provide security services and are not responsible for theft, damage, or other incidents involving your vehicle while parked on partner properties.
            </p>

            <h3>7.4 Third-Party Services</h3>
            <p>
              We are not liable for issues arising from third-party services including Stripe payment processing or Twilio messaging services.
            </p>

            <h3>7.5 Maximum Liability</h3>
            <p>
              To the fullest extent permitted by law, our total liability for any claims related to our Service shall not exceed the amount you paid for parking services in the twelve months preceding the claim.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. INDEMNIFICATION</h2>
            <p>
              You agree to indemnify and hold harmless PARQIT, its affiliates, and Property Partners from any claims, damages, or expenses arising from your use of parking spaces, violation of these Terms, or violation of any law or third-party rights.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. DATA PRIVACY</h2>
            <p>
              Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated by reference into these Terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. INTELLECTUAL PROPERTY</h2>
            <p>
              All content, trademarks, and intellectual property related to the PARQIT service remain the property of PARQIT or our licensors. You may not use our intellectual property without express written permission.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. PROHIBITED USES</h2>
            <p>You may not:</p>
            <ul>
              <li>Use the Service for any unlawful purpose</li>
              <li>Provide false or misleading information</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the Service to harm or harass others</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>12. SERVICE RESTRICTIONS</h2>
            <p>
              We may restrict or prohibit your use of the Service at any time, with or without notice, for violation of these Terms or for any other reason. Such restrictions may include declining to process parking reservations or blocking access to our platform.
            </p>
          </div>

          <div className="legal-section">
            <h2>13. MODIFICATIONS TO TERMS</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website or notification to users. Continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>14. DISPUTE RESOLUTION</h2>

            <h3>14.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of the State of Utah, without regard to conflict of law principles.
            </p>

            <h3>14.2 Jurisdiction</h3>
            <p>
              Any disputes arising from these Terms or use of the Service shall be resolved in the courts of Utah.
            </p>

            <h3>14.3 Arbitration</h3>
            <p>
              For disputes involving amounts under $10,000, parties agree to binding arbitration through the American Arbitration Association before pursuing court action.
            </p>
          </div>

          <div className="legal-section">
            <h2>15. SEVERABILITY</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall continue in full force and effect.
            </p>
          </div>

          <div className="legal-section">
            <h2>16. ENTIRE AGREEMENT</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and PARQIT regarding the Service and supersede all prior agreements and understandings.
            </p>
          </div>

          <div className="legal-section">
            <h2>17. CONTACT INFORMATION</h2>
            <p>For questions about these Terms or our Service, please contact us at:</p>
            <p>
              <strong>PARQIT</strong><br />
              Email: pleaseparq@gmail.com
            </p>
          </div>

          <div className="legal-section">
            <h2>18. ACKNOWLEDGMENT</h2>
            <p>
              By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="legal-disclaimer">
            <p>
              These Terms and Conditions are effective as of the date first written above and will remain in effect until modified or terminated in accordance with the terms herein.
            </p>
            <p>
              Last Updated: August 1, 2025
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

export default TermsPage;