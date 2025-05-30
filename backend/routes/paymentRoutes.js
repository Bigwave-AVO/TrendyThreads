import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/initialize', async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100 // Convert to kobo
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ url: response.data.data.authorization_url });
  } catch (err) {
    console.error('PAYSTACK ERROR:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

export default router;
