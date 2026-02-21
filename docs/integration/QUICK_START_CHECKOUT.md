# Quick Start: Stripe Checkout Integration for Parq

This is a condensed guide to get you started quickly. For complete details, see [STRIPE_WEBHOOK_INTEGRATION.md](./STRIPE_WEBHOOK_INTEGRATION.md).

---

## Essential Configuration

### 1. Required Custom Fields

Your Stripe Checkout session **MUST** include these exact custom fields:

```javascript
custom_fields: [
  {
    key: 'spacenumber',              // EXACT key - case-sensitive!
    label: { type: 'custom', custom: 'Space Number' },
    type: 'numeric',
    numeric: { minimum: 1, maximum: 99 }
  },
  {
    key: 'licenseplatenumber',       // EXACT key - case-sensitive!
    label: { type: 'custom', custom: 'License Plate Number' },
    type: 'text',
    text: { minimum_length: 2, maximum_length: 10 }
  },
  {
    key: 'wouldyouliketoreceivetextreminders',  // EXACT key!
    label: { type: 'custom', custom: 'Receive text reminders?' },
    type: 'dropdown',
    dropdown: {
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    }
  }
]
```

### 2. Webhook Endpoint

**Production URL:** `https://your-function-app.azurewebsites.net/api/stripeWebhook`

Configure in Stripe Dashboard:
- Go to Developers → Webhooks
- Add endpoint with URL above
- Select event: `checkout.session.completed`
- Copy signing secret (starts with `whsec_`)

### 3. Minimum Checkout Session

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',

  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: `Parking - Space ${spaceNumber}`,
        description: `1 hour parking for Space ${spaceNumber}`
      },
      unit_amount: 250  // $2.50 in cents
    },
    quantity: 1
  }],

  success_url: 'https://parq.app/payment-success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://parq.app/payment-cancelled',

  custom_fields: [ /* see section 1 above */ ],

  customer_creation: 'always',
  phone_number_collection: { enabled: true },

  expires_at: Math.floor(Date.now() / 1000) + (30 * 60)  // 30 min expiration
});

// Redirect user to session.url
```

---

## Pricing Structure

| Amount | Duration |
|--------|----------|
| $2.50+ | 1 hour |
| $1.25 - $2.49 | 30 minutes |
| < $1.25 | Defaults to 1 hour |

**Example:**
```javascript
unit_amount: 250  // $2.50 = 1 hour parking
```

---

## What Happens After Payment

1. Customer completes payment on Stripe
2. Stripe sends `checkout.session.completed` webhook
3. Azure Function processes webhook:
   - Verifies signature
   - Extracts space number, license plate, phone
   - Calculates expiration time
   - Stores in Azure Table Storage (parkingfeedback table)
   - Sends SMS confirmation (if opted-in)
4. Customer redirected to `success_url`
5. Validation system monitors payment status

---

## Success Page Implementation

Your `success_url` should display:

```javascript
// Extract session_id from URL query params
const sessionId = new URLSearchParams(window.location.search).get('session_id');

// Fetch session details from your backend
const response = await fetch(`/api/checkout-session/${sessionId}`);
const session = await response.json();

// Display to user:
// - Space number
// - Expiration time
// - License plate
// - SMS confirmation status
```

**Example Success Page:**

```html
<div class="success-container">
  <h1>Payment Confirmed!</h1>
  <p>Space: <strong>15</strong></p>
  <p>Valid Until: <strong>3:30 PM MT</strong></p>
  <p>License Plate: <strong>ABC123</strong></p>
  <p>SMS confirmation sent to your phone.</p>

  <button onclick="addToCalendar()">Add to Calendar</button>
  <button onclick="viewReceipt()">View Receipt</button>
</div>
```

---

## Testing Checklist

- [ ] Custom fields have exact keys (case-sensitive!)
- [ ] Phone number collection enabled
- [ ] Webhook endpoint configured in Stripe
- [ ] Webhook secret set in Azure Function settings
- [ ] Test with card: `4242 4242 4242 4242`
- [ ] Verify payment appears in Azure Table Storage
- [ ] Check SMS sent (if opted-in)
- [ ] Success page displays correct data

---

## Common Pitfalls

1. **Custom field keys MUST be exact:**
   - ❌ `spaceNumber` (wrong case)
   - ❌ `space_number` (wrong format)
   - ✅ `spacenumber` (correct!)

2. **Amount must be in cents:**
   - ❌ `unit_amount: 2.50` (wrong - dollars)
   - ✅ `unit_amount: 250` (correct - cents)

3. **Phone number collection required:**
   - ❌ `phone_number_collection: { enabled: false }`
   - ✅ `phone_number_collection: { enabled: true }`

4. **Webhook secret environment variable:**
   - Must be set as `STRIPE_WEBHOOK_SECRET` in Azure Function settings
   - Different for test mode vs live mode

---

## Backend API Endpoint Example

Create an endpoint in your Next.js app to create Stripe sessions:

```javascript
// pages/api/create-checkout-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { spaceNumber, duration = 1 } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Parking - Space ${spaceNumber}`,
            description: `${duration} hour parking for Space ${spaceNumber}`
          },
          unit_amount: duration >= 1 ? 250 : 125  // $2.50 or $1.25
        },
        quantity: 1
      }],

      success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment-cancelled`,

      custom_fields: [
        {
          key: 'spacenumber',
          label: { type: 'custom', custom: 'Space Number' },
          type: 'numeric',
          numeric: { minimum: 1, maximum: 99 },
          optional: false
        },
        {
          key: 'licenseplatenumber',
          label: { type: 'custom', custom: 'License Plate Number' },
          type: 'text',
          text: { minimum_length: 2, maximum_length: 10 },
          optional: false
        },
        {
          key: 'wouldyouliketoreceivetextreminders',
          label: { type: 'custom', custom: 'Receive text reminders?' },
          type: 'dropdown',
          dropdown: {
            options: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ],
            default_value: 'yes'
          },
          optional: true
        }
      ],

      customer_creation: 'always',
      phone_number_collection: { enabled: true },

      expires_at: Math.floor(Date.now() / 1000) + (30 * 60)
    });

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

---

## Frontend Integration Example

```javascript
// components/PaymentForm.jsx
'use client';
import { useState } from 'react';

export default function PaymentForm({ spaceNumber }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spaceNumber: spaceNumber,
          duration: 1  // hours
        })
      });

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="checkout-button"
    >
      {loading ? 'Processing...' : `Pay for Space ${spaceNumber}`}
    </button>
  );
}
```

---

## Environment Variables Needed

Create `.env.local` in your Next.js project:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_your_test_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Webhook URL (set this after deploying Azure Function)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Note:** The webhook secret is for the Azure Function, not your Next.js app. Set it in Azure Function App Settings.

---

## Testing Locally

1. **Start Stripe CLI:**
   ```bash
   stripe listen --forward-to http://localhost:7071/api/stripeWebhook
   ```

2. **Get webhook secret from CLI output:**
   ```bash
   > Ready! Your webhook signing secret is whsec_xxxxx
   ```

3. **Set in Azure Function local.settings.json:**
   ```json
   {
     "Values": {
       "STRIPE_WEBHOOK_SECRET": "whsec_xxxxx"
     }
   }
   ```

4. **Start Azure Function:**
   ```bash
   cd stripeWebhookPP-update
   func start
   ```

5. **Test payment:**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiration date
   - Any CVC

---

## Production Deployment

1. **Deploy Azure Function**
2. **Get production webhook URL:**
   - `https://your-function-app.azurewebsites.net/api/stripeWebhook`

3. **Configure Stripe webhook:**
   - Stripe Dashboard → Webhooks → Add endpoint
   - URL: Production webhook URL
   - Events: `checkout.session.completed`
   - Get signing secret

4. **Set Azure Function environment variable:**
   - Azure Portal → Function App → Configuration
   - Add `STRIPE_WEBHOOK_SECRET` with production secret

5. **Test end-to-end flow**

---

## Next Steps

1. Read full documentation: [STRIPE_WEBHOOK_INTEGRATION.md](./STRIPE_WEBHOOK_INTEGRATION.md)
2. Review webhook handler code in backend repo
3. Test webhook with Stripe CLI
4. Deploy to production
5. Monitor Application Insights for webhook processing

---

## Support

**Backend Repository:** `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection`
**Frontend Repository:** `D:\Parq-website`
**Full Documentation:** `docs/integration/STRIPE_WEBHOOK_INTEGRATION.md`

For questions, refer to the complete technical documentation.
