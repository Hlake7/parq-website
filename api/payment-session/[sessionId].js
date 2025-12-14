// Vercel Serverless Function to retrieve payment session details
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.payment_status,
      spotId: session.metadata.spotId,
      duration: session.metadata.duration,
      amount: session.amount_total / 100, // Convert back from cents
      email: session.metadata.email,
      phone: session.metadata.phone,
      licensePlate: session.metadata.licensePlate,
      smsReminders: session.metadata.smsReminders,
      promoCode: session.metadata.promoCode,
      promoDiscount: session.metadata.promoDiscount,
      bookingDate: session.metadata.bookingDate
    });
  } catch (error) {
    console.error('Error retrieving payment session:', error);
    res.status(500).json({
      error: 'Failed to retrieve payment session',
      details: error.message
    });
  }
};
