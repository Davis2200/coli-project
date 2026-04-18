import stripe from 'stripe';

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-03-25.dahlia',
  appInfo: {
    name: 'Coli - Experiencias Auténticas',
  },
});

export default stripeInstance;
