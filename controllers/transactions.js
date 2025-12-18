const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Show transactions for logged-in user
router.get('/', async (req, res) => {
  const userId = req.session.userId;

  const transactions = await Transaction.find({
    $or: [
      { from: userId },
      { to: userId }
    ]
  })
  .populate('from')
  .populate('to')
  .populate({
    path: 'match',
    populate: {
      path: 'request',
      populate: { path: 'talent', populate: { path: 'student' } }
    }
  })
  .lean();

  res.render('transactions/index', { transactions });
});

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  const transactions = await Transaction.find({
    $or: [{ from: userId }, { to: userId }]
  })
    .populate('from to match')
    .lean();

  res.render('transactions/index', { transactions });
});

module.exports = router;