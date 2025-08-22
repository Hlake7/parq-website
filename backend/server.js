require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Parq backend server is running' });
});

// Create Stripe Checkout session
app.post('/api/create-payment', async (req, res) => {
  try {
    const { spotId, duration, price, email, phone, licensePlate, smsReminders } = req.body;

    // Validate input
    if (!spotId || !duration || !price || !email || !phone || !licensePlate) {
      return res.status(400).json({ 
        error: 'Missing required fields: spotId, duration, price, email, phone, licensePlate' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email address' 
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Parking Spot #${spotId}`,
              description: `Lumber Building Parking - ${getDurationLabel(duration)}\nLicense Plate: ${licensePlate}\nPhone: ${phone}`,
            },
            unit_amount: price * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/book/lumber-building/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/book/lumber-building`,
      metadata: {
        spotId: spotId.toString(),
        duration: duration,
        email: email,
        phone: phone,
        licensePlate: licensePlate.toUpperCase(),
        smsReminders: smsReminders ? 'yes' : 'no',
        bookingDate: new Date().toISOString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ 
      error: 'Failed to create payment session',
      details: error.message 
    });
  }
});

// Get payment session details (for success page)
app.get('/api/payment-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    res.json({
      status: session.payment_status,
      spotId: session.metadata.spotId,
      duration: session.metadata.duration,
      amount: session.amount_total / 100, // Convert back from cents
      email: session.metadata.email,
      phone: session.metadata.phone,
      licensePlate: session.metadata.licensePlate,
      smsReminders: session.metadata.smsReminders === 'yes',
      bookingDate: session.metadata.bookingDate,
      customerEmail: session.customer_email,
    });
  } catch (error) {
    console.error('Error retrieving payment session:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve payment session',
      details: error.message 
    });
  }
});

// Helper function to get duration label
function getDurationLabel(duration) {
  const durationMap = {
    '1': '1 Hour',
    '2': '2 Hours', 
    '4': '4 Hours',
    '8': 'All Day (8 Hours)'
  };
  return durationMap[duration] || `${duration} Hours`;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚗 Parq backend server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  
  // Check for required environment variables
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️  WARNING: STRIPE_SECRET_KEY environment variable not set');
  }
});