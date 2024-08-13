const express = require('express');
const router = express.Router();
const { authorizeRole } = require('../middleware/authorizationMiddleware');
const { getUserNotifications, markAsRead } = require('../controllers/notificationController');

// Get all notifications for the logged-in user
router.get('/', authorizeRole('player'), getUserNotifications);

// Mark a notification as read
router.put('/:id/read', authorizeRole('player'), markAsRead);

module.exports = router;
