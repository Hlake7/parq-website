# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Parq AI is a dual-purpose platform:
1. **Business Marketing Site** - Homepage, about, services, and contact pages showcasing AI-powered parking compliance technology
2. **Multi-Property Booking System** - Property-specific parking reservation systems with visual spot selection

Built as a monorepo with separate frontend (React) and backend (Node.js/Express) applications deployed together on Vercel.

## Architecture

### Monorepo Structure
- `frontend/` - React 19 + TypeScript SPA
- `backend/` - Express API with Stripe integration
- `public/` and `public-checkout/` - Static assets including aerial images for parking maps
- Deployed as a unified application via Vercel with API rewrites

### Key Design Patterns

**Property-Specific Booking URLs**: Each property gets its own booking route at `/book/[property-name]` (e.g., `/book/lumber-building`). This allows:
- Dedicated parking configurations per property
- Property-specific aerial images and spot coordinates
- Scalable multi-property expansion

**Canvas-based Interactive Maps**: The `ParkingMap.tsx` component uses HTML5 Canvas for:
- Rendering aerial parking lot imagery
- Drawing polygon boundaries for each spot (defined by 4-corner coordinates)
- Interactive hover/click spot selection
- Mobile-responsive scaling with touch support

**Stripe Checkout Flow**:
1. User selects spot, duration, and enters details in `BookingPage.tsx`
2. Backend creates Stripe Checkout session via `/api/create-payment`
3. Stripe redirects to success page with `session_id` query param
4. Success page fetches session details from `/api/payment-session/:sessionId`

### TypeScript Types
All parking-related types are centralized in `frontend/src/types/parking.ts`:
- `ParkingSpot` - Spot definition with polygon coordinates
- `ParkingMapProps` - Canvas map component props
- `SpotState` - UI state for hover/selection

## Common Commands

### Development
```bash
# Start backend (runs on port 3001)
cd backend && npm run dev

# Start frontend (runs on port 3000)
cd frontend && npm start

# Install all dependencies
cd backend && npm install && cd ../frontend && npm install
```

### Build & Test
```bash
# Build frontend for production
cd frontend && npm run build

# Run frontend tests
cd frontend && npm test

# Test production build locally
cd frontend && npx serve -s build -l 3000
```

### Backend
- `npm start` - Production mode (node)
- `npm run dev` - Development mode with nodemon auto-restart

## Environment Configuration

### Backend (.env)
Required environment variables:
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (not used in backend but documented)
- `FRONTEND_URL` - Frontend domain for Stripe redirects (defaults to http://localhost:3000)
- `PORT` - Server port (defaults to 3001)
- `AZURE_STORAGE_CONNECTION_STRING` - For parking occupancy data (optional)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (defaults to http://localhost:3001)

## API Endpoints

**POST `/api/create-payment`**
Creates Stripe Checkout session for parking reservation.
Body: `{ spotId, duration, price, email, phone, licensePlate, smsReminders, promoCode, promoDiscount }`

**GET `/api/payment-session/:sessionId`**
Retrieves completed payment session details for confirmation page.

**GET `/health`**
Health check endpoint.

## Component Architecture

### Business Pages (Marketing Site)
- `Homepage.tsx` - AI compliance messaging and value propositions
- `AboutPage.tsx` - Company story and team information
- `ServicesPage.tsx` - AI solutions showcase
- `ContactPage.tsx` - Lead generation form
- `PrivacyPage.tsx`, `TermsPage.tsx` - Legal pages

All styled via `BusinessPages.css` with a modern, tech-forward design system.

### Booking System
- `BookingPage.tsx` - Main booking interface with form and pricing
- `ParkingMap.tsx` - Canvas-based interactive parking lot map
- `PaymentSuccess.tsx` - Post-payment confirmation page

### Routing
Routes configured in `frontend/src/App.tsx`:
- Business routes: `/`, `/about`, `/services`, `/contact`, `/privacy`, `/terms`
- Property routes: `/book/[property-name]`, `/book/[property-name]/success`

## Adding New Properties

To add a new property booking system:

1. Add aerial image to `public-checkout/[property-name]/`
2. Define parking spot coordinates (4-corner polygons) in `BookingPage.tsx`
3. Add route in `App.tsx`: `<Route path="/book/[property-name]" element={<BookingPage />} />`
4. Update backend `server.js` success/cancel URLs to support new property name
5. Consider extracting property configs to separate files if managing 3+ properties

## Deployment

Deployed to Vercel with monorepo configuration via `vercel.json`:
- Build command installs both backend and frontend dependencies
- Output directory is `frontend/build`
- API routes rewrite `/api/*` to `backend/server.js`

**Environment variables must be set in Vercel dashboard** for production deployment.

See DEPLOYMENT.md for complete deployment checklist and Stripe configuration.

## Promo Code System

Promo codes are defined in `BookingPage.tsx` in the `validPromoCodes` object:
```typescript
const validPromoCodes = {
  'CODE': 0.10,  // 10% discount
  // ...
}
```

Applied at checkout, stored in Stripe session metadata, and displayed on success page.

## Parking Spot Coordinates

Each parking spot is defined by 4 corner coordinates relative to the aerial image dimensions:
```typescript
{
  id: number,
  coordinates: [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]
}
```

The `ParkingMap.tsx` component renders these as polygons on the canvas. Coordinates must be measured from the actual aerial image to ensure visual accuracy.
