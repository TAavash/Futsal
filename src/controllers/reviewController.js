const Review = require('../models/reviewModel');
const Court = require('../models/courtModel');

// Create a new review
const createReview = async (req, res) => {
    try {
        const { courtId, rating, comment } = req.body;
        const userId = req.user._id; // Assuming user is authenticated

        const review = new Review({
            user: userId,
            court: courtId,
            rating,
            comment
        });

        const savedReview = await review.save();

        // Optionally, you can also push this review to the Court's reviews array
        await Court.findByIdAndUpdate(courtId, {
            $push: { reviews: savedReview._id }
        });

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reviews for a court
const getReviewsByCourt = async (req, res) => {
    try {
        const reviews = await Review.find({ court: req.params.courtId })
            .populate('user', 'username')
            .populate('court', 'name');

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getReviewsByCourt,
    deleteReview
};
