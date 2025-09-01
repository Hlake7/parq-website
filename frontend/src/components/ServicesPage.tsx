import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessPages.css';

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
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
            <Link to="/services" className="nav-link active">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/book/lumber-building" className="nav-cta">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">AI-Powered Solutions</h1>
          <p className="page-subtitle">
            Comprehensive parking management solutions that increase revenue, 
            reduce costs, and eliminate manual oversight.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="services-overview">
        <div className="container">
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-icon">🤖</div>
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
              <div className="service-icon">⚡</div>
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
              <div className="service-icon">📊</div>
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
          <h2 className="section-title">Investment Options</h2>
          <div className="pricing-grid">
            <a href="mailto:parqitai@gmail.com?subject=Interest%20in%20Parq%20AI%20Starter%20Plan&body=Hi%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20the%20Starter%20plan%20for%20my%20property.%20Here%20are%20some%20details%3A%0A%0AProperty%20Name%3A%20%0ANumber%20of%20Parking%20Spots%3A%20%0ALocation%3A%20%0ACurrent%20Parking%20Challenges%3A%20%0A%0APlease%20contact%20me%20to%20discuss%20pricing%20and%20next%20steps.%0A%0AThanks%21" className="pricing-card">
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
            </a>
            <a href="mailto:parqitai@gmail.com?subject=Interest%20in%20Parq%20AI%20Professional%20Plan&body=Hi%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20the%20Professional%20plan%20for%20my%20property.%20Here%20are%20some%20details%3A%0A%0AProperty%20Name%3A%20%0ANumber%20of%20Parking%20Spots%3A%20%0ALocation%3A%20%0ACurrent%20Parking%20Challenges%3A%20%0A%0APlease%20contact%20me%20to%20discuss%20pricing%20and%20next%20steps.%0A%0AThanks%21" className="pricing-card featured">
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
            </a>
            <a href="mailto:parqitai@gmail.com?subject=Interest%20in%20Parq%20AI%20Enterprise%20Plan&body=Hi%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20the%20Enterprise%20plan%20for%20my%20property%20portfolio.%20Here%20are%20some%20details%3A%0A%0ACompany%20Name%3A%20%0ANumber%20of%20Properties%3A%20%0ATotal%20Parking%20Spots%3A%20%0ALocation(s)%3A%20%0ACurrent%20Parking%20Management%20Solution%3A%20%0ASpecific%20Requirements%3A%20%0A%0APlease%20contact%20me%20to%20discuss%20a%20custom%20quote%20and%20implementation%20timeline.%0A%0AThanks%21" className="pricing-card">
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
            </a>
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
            <Link to="/contact" className="btn-primary large">
              Schedule Demo
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

export default ServicesPage;