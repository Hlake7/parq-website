# Parq Website Deployment Guide

## Prerequisites

- Node.js 16+ installed
- Vercel account (or alternative hosting platform)
- Stripe account (test and production keys)
- Azure Storage account (for parking occupancy data)

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_production_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_production_stripe_publishable_key

# Server Configuration
PORT=3001
FRONTEND_URL=https://your-production-domain.vercel.app

# Azure Storage
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=https://your-production-domain.vercel.app
```

## Deploying to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all backend and frontend environment variables
   - Make sure to set `REACT_APP_API_URL` to your Vercel domain

5. Redeploy with production settings:
   ```bash
   vercel --prod
   ```

### Option 2: Vercel GitHub Integration

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables in project settings
4. Vercel will automatically deploy on every push to main branch

## Environment Variables in Vercel

Set these in your Vercel project settings:

**Backend Variables:**
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `FRONTEND_URL` - Your frontend URL (e.g., https://your-domain.vercel.app)
- `AZURE_STORAGE_CONNECTION_STRING` - Azure Storage connection string
- `NODE_ENV` - Set to `production`

**Frontend Variables:**
- `REACT_APP_API_URL` - Your backend API URL (same as your Vercel domain)

## Local Development

1. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both `backend/` and `frontend/`
   - Fill in your test/development values

3. Run development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

4. Access the app at http://localhost:3000

## Production Build Testing

Test the production build locally before deploying:

```bash
# Build frontend
cd frontend
npm run build

# Serve the build
npx serve -s build -l 3000

# Test backend
cd ../backend
npm start
```

## Post-Deployment Checklist

- [ ] Verify all environment variables are set correctly in Vercel
- [ ] Test the payment flow with Stripe test cards
- [ ] Verify the parking spot selection works
- [ ] Test promo codes (SAVE10, SAVE20, WELCOME, FREEPARKING)
- [ ] Check mobile responsiveness
- [ ] Verify email notifications are working
- [ ] Test SMS reminders (if enabled)
- [ ] Monitor Vercel logs for any errors
- [ ] Set up Stripe webhooks for production

## Stripe Configuration

### Test Mode (Development)
- Use test API keys (sk_test_... and pk_test_...)
- Test with Stripe test cards: https://stripe.com/docs/testing

### Production Mode
1. Switch to live API keys in environment variables
2. Set up Stripe webhooks:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
3. Update webhook secret in environment variables

## Promo Codes

Current active promo codes:
- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `WELCOME` - 15% discount
- `FREEPARKING` - 50% discount

To add or modify promo codes, edit the `validPromoCodes` object in [BookingPage.tsx](frontend/src/components/BookingPage.tsx#L86).

## Monitoring and Logs

- **Vercel Logs**: View in Vercel dashboard under "Deployments"
- **Stripe Dashboard**: Monitor payments and errors
- **Azure Storage**: Monitor occupancy data sync

## Troubleshooting

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings in `backend/server.js`
- Ensure Vercel routes are configured properly

### Stripe checkout fails
- Verify Stripe API keys are correct
- Check `FRONTEND_URL` matches your domain
- Review Stripe dashboard for error details

### Build fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build` in frontend
- Verify all dependencies are in package.json

## Support

For issues or questions:
- Check Vercel deployment logs
- Review Stripe dashboard for payment issues
- Check Azure Storage logs for occupancy data issues
