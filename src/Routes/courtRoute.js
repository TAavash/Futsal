const express = require('express');
const router = express.Router();
const { authorizeRole } = require('../middleware/authorizationMiddleware');
const {
  createCourt,
  getCourts,
  getCourtById,
  updateCourt,
  deleteCourt,
} = require('../controllers/courtController');

// Create a new court (Admin Only)
router.post('/courts', authorizeRole('admin'), createCourt);

// Get all courts (Public)
router.get('/courts', getCourts);

// Get a single court by ID (Public)
router.get('/courts/:id', getCourtById);

// Update a court (Admin Only)
router.put('/courts/:id', authorizeRole('admin'), updateCourt);

// Delete a court (Admin Only)
router.delete('/courts/:id', authorizeRole('admin'), deleteCourt);

module.exports = router;
