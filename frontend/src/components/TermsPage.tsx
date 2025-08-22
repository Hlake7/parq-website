import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessPages.css';

const TermsPage: React.FC = () => {
  return (
    <div className="terms-page">
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
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/book/lumber-building" className="nav-cta">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="legal-content">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: December 2024</p>

          <div className="legal-section">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and 
              Parq AI ("Company," "we," "our," or "us") concerning your use of our website and 
              AI-powered parking management services.
            </p>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. If you do not 
              agree to these Terms, please do not use our services.
            </p>
          </div>

          <div className="legal-section">
            <h2>Description of Services</h2>
            <p>
              Parq AI provides AI-powered parking management solutions including:
            </p>
            <ul>
              <li>Automated parking compliance monitoring</li>
              <li>Computer vision-based violation detection</li>
              <li>Real-time analytics and reporting dashboards</li>
              <li>Parking reservation and payment processing systems</li>
              <li>Automated enforcement workflow management</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>User Accounts and Registration</h2>
            <p>
              To access certain features, you may need to create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, complete, and current information</li>
              <li>Maintain and update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized account access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Acceptable Use</h2>
            
            <h3>Permitted Uses</h3>
            <p>You may use our services for legitimate parking management and compliance purposes.</p>

            <h3>Prohibited Uses</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to any part of our services</li>
              <li>Reverse engineer, modify, or create derivative works</li>
              <li>Use our services to harass, abuse, or harm others</li>
              <li>Collect or store personal data of others without consent</li>
              <li>Transmit viruses, malware, or other harmful code</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>AI Technology and Data Processing</h2>
            <p>
              Our AI systems process visual and operational data to provide parking management services. 
              By using our services, you acknowledge and agree that:
            </p>
            <ul>
              <li>AI systems may occasionally produce inaccurate results</li>
              <li>You will verify AI-generated compliance reports before taking action</li>
              <li>We continuously improve our AI models using aggregated, anonymized data</li>
              <li>Visual data processing complies with applicable privacy laws</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Payment Terms</h2>
            <p>
              For paid services:
            </p>
            <ul>
              <li>Fees are charged according to your selected service plan</li>
              <li>Payment is due in advance for each billing period</li>
              <li>We accept major credit cards and ACH transfers</li>
              <li>Late payments may result in service suspension</li>
              <li>Refunds are provided according to our refund policy</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Intellectual Property Rights</h2>
            <p>
              The services and their original content, features, and functionality are owned by Parq AI 
              and protected by international copyright, trademark, patent, trade secret, and other 
              intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to use our services 
              for their intended purpose.
            </p>
          </div>

          <div className="legal-section">
            <h2>Data and Privacy</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is 
              governed by our Privacy Policy. By using our services, you consent to the collection 
              and use of information as outlined in our Privacy Policy.
            </p>
          </div>

          <div className="legal-section">
            <h2>Service Availability</h2>
            <p>
              While we strive to provide reliable service, we do not guarantee:
            </p>
            <ul>
              <li>Uninterrupted or error-free operation</li>
              <li>Availability at all times</li>
              <li>Compatibility with all devices or software</li>
              <li>That our services will meet all your requirements</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue services with reasonable notice.
            </p>
          </div>

          <div className="legal-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Parq AI shall not be liable for:
            </p>
            <ul>
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Any loss of profits, revenues, data, or use</li>
              <li>Any damages arising from your use or inability to use our services</li>
              <li>Any AI system errors or inaccuracies in automated processing</li>
            </ul>
            <p>
              Our total liability shall not exceed the amount you paid for our services in the 
              twelve months preceding the claim.
            </p>
          </div>

          <div className="legal-section">
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Parq AI from any claims, damages, losses, 
              liabilities, and expenses arising from:
            </p>
            <ul>
              <li>Your use of our services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your use of AI-generated data for enforcement actions</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to our services immediately, without notice, 
              for any breach of these Terms or for any other reason.
            </p>
            <p>
              You may terminate your account at any time by contacting us. Upon termination, 
              your right to use our services will cease immediately.
            </p>
          </div>

          <div className="legal-section">
            <h2>Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of the State of California, without regard to 
              its conflict of law principles.
            </p>
            <p>
              Any disputes arising from these Terms or our services will be resolved through 
              binding arbitration, except for claims that may be brought in small claims court.
            </p>
          </div>

          <div className="legal-section">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of 
              significant changes by posting updated Terms on our website and updating the 
              "last updated" date.
            </p>
            <p>
              Your continued use of our services after changes become effective constitutes 
              acceptance of the revised Terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>Contact Information</h2>
            <p>For questions about these Terms, please contact us:</p>
            <ul>
              <li>Email: legal@parq-ai.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Innovation Drive, San Francisco, CA 94107</li>
            </ul>
          </div>

          <div className="legal-disclaimer">
            <p>
              <em>
                This is a template Terms of Service document. Actual implementation should be reviewed 
                by qualified legal counsel and customized based on specific business practices, 
                applicable laws, and jurisdictional requirements.
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

export default TermsPage;