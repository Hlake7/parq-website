# Parq AI - AI-Powered Parking Management Platform

A complete business platform showcasing AI-powered parking compliance technology with integrated property-specific booking systems. Built for investors, enterprise clients, and property owners seeking intelligent parking solutions.

## Platform Features

### 🏢 **Business Marketing Platform**
✅ **Professional Homepage** - AI-powered parking compliance focus  
✅ **Company Story** - About page with team and innovation details  
✅ **Solutions Showcase** - Comprehensive services and technology overview  
✅ **Contact & Lead Generation** - Professional contact forms and business info  
✅ **Legal Pages** - Privacy policy and terms of service  

### 🅿️ **Property Booking Systems** 
✅ **Visual Parking Map** - Interactive aerial view with precise spot boundaries  
✅ **Smart Spot Selection** - Click-to-select with visual highlighting  
✅ **Multi-property Support** - Scalable `/book/property-name` architecture  
✅ **Duration & Pricing** - Flexible options from 1 hour to all day  
✅ **Mobile Responsive** - Optimized for phones and tablets  
✅ **Secure Payments** - Stripe Checkout integration  
✅ **Booking Confirmation** - Professional success page with details  

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Canvas-based interactive parking map
- React Router for navigation
- Modern tech-forward design system
- Mobile-first responsive design

**Backend:**
- Node.js with Express
- Stripe payment processing
- Multi-property booking support
- Environment-based configuration

## Platform Architecture

### Business Pages
- `/` - Homepage with AI compliance messaging
- `/about` - Company story and team information
- `/services` - AI solutions and technology showcase
- `/contact` - Lead generation and business inquiries

### Property Booking Systems
- `/book/lumber-building` - Lumber Building parking reservations
- `/book/[property-name]` - Scalable for additional properties
- Success pages: `/book/[property-name]/success`

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd parq-website

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies  
cd ../frontend && npm install
```

### 2. Configure Environment
```bash
# Copy environment template
cd backend
cp .env.example .env

# Add your Stripe keys to .env:
# STRIPE_SECRET_KEY=sk_test_your_key_here
# STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Run Development Servers
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend  
cd frontend && npm start
```

Visit http://localhost:3000 to see the business homepage!

**Access Points:**
- http://localhost:3000 - Business homepage
- http://localhost:3000/book/lumber-building - Lumber Building booking system
- http://localhost:3000/services - AI solutions showcase
- http://localhost:3000/contact - Business inquiries

## Pricing Structure

- **1 Hour:** $5
- **2 Hours:** $9  
- **4 Hours:** $16
- **All Day (8 Hours):** $25

## Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get test API keys from dashboard
3. Add keys to `backend/.env`
4. Test with card number: `4242 4242 4242 4242`

## Project Structure

```
parq-website/
├── frontend/                    # React TypeScript app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Homepage.tsx           # Business homepage
│   │   │   ├── AboutPage.tsx          # Company information
│   │   │   ├── ServicesPage.tsx       # AI solutions showcase
│   │   │   ├── ContactPage.tsx        # Business contact form
│   │   │   ├── PrivacyPage.tsx        # Privacy policy
│   │   │   ├── TermsPage.tsx          # Terms of service
│   │   │   ├── BookingPage.tsx        # Property booking system
│   │   │   ├── ParkingMap.tsx         # Interactive map component
│   │   │   ├── PaymentSuccess.tsx     # Booking confirmation
│   │   │   ├── BusinessPages.css      # Modern styling
│   │   │   └── index.ts               # Component exports
│   │   ├── types/                     # TypeScript definitions
│   │   └── App.tsx                    # Route configuration
├── backend/                     # Node.js Express API
│   ├── server.js                      # Main server with Stripe
│   ├── .env.example                   # Environment template
│   └── package.json
├── docs/                        # Documentation
│   ├── MCP-docs.md                    # MCP integration guide
│   └── subagents-docs.md              # Subagents documentation
├── vercel.json                  # Deployment configuration
└── README.md
```

## API Endpoints

- `POST /api/create-payment` - Create Stripe checkout session
- `GET /api/payment-session/:sessionId` - Get payment details
- `GET /health` - Health check

## Key Messaging & Value Propositions

### For Investors & Partners
- **AI-First Approach** - Cutting-edge computer vision and machine learning
- **Scalable Architecture** - Multi-property platform ready for expansion
- **Revenue Growth** - 35% average increase through better compliance
- **Operational Efficiency** - 90% reduction in manual oversight

### For Property Owners
- **Automated Compliance** - 24/7 AI monitoring with 99.2% accuracy
- **Revenue Optimization** - Data-driven pricing and enforcement
- **Reduced Costs** - Minimal manual intervention required
- **Professional Experience** - Modern booking system for tenants/visitors

## Expansion Ready

The platform is architected for easy expansion:
- Add new properties at `/book/[new-property-name]`
- Centralized business marketing drives all locations
- Shared Stripe/payment processing across properties
- Consistent AI compliance messaging and branding

## Deployment

Ready for GitHub and Vercel with:
- ✅ Production Vercel configuration
- ✅ Environment variable management
- ✅ Security best practices
- ✅ Mobile-responsive design
- ✅ Enterprise-ready presentation

## Contributing

1. Fork the repository
2. Create feature branch  
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - feel free to use for your own projects!

---

Built with ❤️ for intelligent parking management • **Parq AI - Revolutionizing parking through artificial intelligence**