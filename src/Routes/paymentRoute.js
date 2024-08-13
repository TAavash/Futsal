const express = require('express');
const router = express.Router();
const { authorizeRole } = require('../middleware/authorizationMiddleware');
const {
  createPayment,
  getUserPayments,
  getAllPayments,
} = require('../controllers/paymentController');

// Create a new payment (Player Only)
router.post('/payments', authorizeRole('player'), createPayment);

// Get all payments for the logged-in user (Player Only)
router.get('/payments/user', authorizeRole('player'), getUserPayments);

// Get all payments (Admin Only)
router.get('/payments', authorizeRole('admin'), getAllPayments);

module.exports = router;
