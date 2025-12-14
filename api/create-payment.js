// Vercel Serverless Function for Stripe Payment
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Helper function to get duration label
function getDurationLabel(duration) {
  const durationMap = {
    '0.5': '30 minutes',
    '1': '1 hour',
    '2': '2 hours',
    '4': '4 hours',
    '6': '6 hours',
    '8': '8 hours'
  };
  return durationMap[duration] || `${duration} hours`;
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { spotId, duration, price, email, phone, licensePlate, smsReminders, promoCode, promoDiscount } = req.body;

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

    // Build product description
    let description = `Lumber Building Parking - ${getDurationLabel(duration)}\nLicense Plate: ${licensePlate}\nPhone: ${phone}`;
    if (promoCode) {
      description += `\nPromo Code: ${promoCode} (${(promoDiscount * 100).toFixed(0)}% off)`;
    }

    // Get frontend URL from environment or request
    const frontendUrl = process.env.FRONTEND_URL || `https://${req.headers.host}`;

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
              description: description,
            },
            unit_amount: Math.round(price * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/checkout/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout/lumber-building/`,
      metadata: {
        spotId: spotId.toString(),
        duration: duration,
        email: email,
        phone: phone,
        licensePlate: licensePlate.toUpperCase(),
        smsReminders: smsReminders ? 'yes' : 'no',
        promoCode: promoCode || '',
        promoDiscount: promoDiscount ? (promoDiscount * 100).toFixed(0) + '%' : '0%',
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
};
