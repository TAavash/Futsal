const Notification = require('../models/notificationModel');

// Create a new notification
const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            user: userId,
            message
        });

        await notification.save();
        return notification;
    } catch (error) {
        throw new Error('Error creating notification');
    }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, {
            isRead: true
        }, { new: true });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNotification,
    getUserNotifications,
    markAsRead
};
