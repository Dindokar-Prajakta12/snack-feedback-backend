const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// POST /api/customers   (create feedback)
router.post('/',
  auth,
  body('name').notEmpty().withMessage('name required'),
  body('email').isEmail().withMessage('valid email required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('rating 1-5 required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const payload = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        productVariant: req.body.productVariant,
        rating: req.body.rating,
        comments: req.body.comments,
        purchaseDate: req.body.purchaseDate ? new Date(req.body.purchaseDate) : undefined,
        store: req.body.store,
        wouldRecommend: !!req.body.wouldRecommend,
        createdBy: req.user._id
      };

      const customer = new Customer(payload);
      await customer.save();
      res.status(201).json(customer);
    } catch (err) { next(err); }
  }
);

// GET /api/customers   (list)
router.get('/', auth, async (req, res, next) => {
  try {
    // optional pagination
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '50')));
    const skip = (page - 1) * limit;

    const total = await Customer.countDocuments();
    const customers = await Customer.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({ total, page, limit, data: customers });
  } catch (err) { next(err); }
});

// GET /api/customers/stats
router.get('/stats', auth, async (req, res, next) => {
  try {
    const total = await Customer.countDocuments();
    const agg = await Customer.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          recommendCount: { $sum: { $cond: ['$wouldRecommend', 1, 0] } }
        }
      }
    ]);

    const avgRating = agg[0]?.avgRating ?? 0;
    const recommendCount = agg[0]?.recommendCount ?? 0;
    const recommendPercent = total ? (recommendCount / total) * 100 : 0;

    res.json({
      total,
      avgRating: Number(avgRating.toFixed(2)),
      recommendPercent: Number(recommendPercent.toFixed(2))
    });
  } catch (err) { next(err); }
});

module.exports = router;
