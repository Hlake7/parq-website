# Parq - Parking Reservation System

A modern web application for reserving parking spots at the Lumber Building with visual spot selection and Stripe payment integration.

## Features

✅ **Visual Parking Map** - Interactive aerial view with precise spot boundaries  
✅ **Smart Spot Selection** - Click-to-select with visual highlighting  
✅ **Duration & Pricing** - Flexible options from 1 hour to all day  
✅ **Mobile Responsive** - Optimized for phones and tablets  
✅ **Secure Payments** - Stripe Checkout integration  
✅ **Booking Confirmation** - Professional success page with details  

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Canvas-based interactive parking map
- React Router for navigation
- Mobile-first responsive design

**Backend:**
- Node.js with Express
- Stripe payment processing
- Environment-based configuration

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

Visit http://localhost:3000 to see your app!

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
├── frontend/          # React TypeScript app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── types/         # TypeScript definitions
│   │   └── ...
├── backend/           # Node.js Express API
│   ├── server.js         # Main server file
│   ├── .env.example      # Environment template
│   └── ...
└── README.md
```

## API Endpoints

- `POST /api/create-payment` - Create Stripe checkout session
- `GET /api/payment-session/:sessionId` - Get payment details
- `GET /health` - Health check

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly  
5. Submit pull request

## License

MIT License - feel free to use for your own projects!

---

Built with ❤️ for efficient parking management