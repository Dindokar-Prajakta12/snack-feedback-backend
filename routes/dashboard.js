const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/auth');
const auth = require('../middleware/auth');


router.get('/', auth, (req, res) => {
  res.json({
    message: 'Welcome to your Dashboard!',
    user: req.user,
    stats: {
      totalCustomers: 32,
      avgFeedbackRating: 4.6,
      reviewsCollected: 120,
    },
  });
});

module.exports = router;
