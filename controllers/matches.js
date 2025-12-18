const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const Transaction = require('../models/transaction');

// List all matches for logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.redirect('/auth/login');

    const matches = await Match.find({
      $or: [
        { talentOwner: userId }, // صاحب الموهبة
        { requester: userId }    // الطالب اللي طلب الموهبة
      ]
    })
      .populate('talentOwner requester')
      .populate({
        path: 'request',
        populate: { path: 'talent', populate: { path: 'student' } }
      })
      .lean();

    // Safety: إذا أي شيء undefined
    matches.forEach(m => {
      m.request = m.request || {};
      m.request.talent = m.request.talent || {};
      m.request.talent.student = m.request.talent.student || { name: 'Unknown' };
      m.talentOwner = m.talentOwner || { name: 'Unknown' };
      m.requester = m.requester || { name: 'Unknown' };
    });

    res.render('matches/index', { matches, user: { _id: userId } });
  } catch (err) {
    console.log(err);
    res.send('Error loading matches');
  }
});

// Accept match (only by talent owner)
router.post('/:id/accept', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).lean();
    if (match && match.talentOwner.toString() === req.session.userId) {
      await Match.findByIdAndUpdate(req.params.id, { status: 'accepted' });
    }
    res.redirect('/matches');
  } catch (err) {
    console.log(err);
    res.redirect('/matches');
  }
});

// Complete match (by requester or talent owner)
router.post('/:id/complete', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).lean();
    if (!match) return res.redirect('/matches');

    const userId = req.session.userId;
    if (match.talentOwner.toString() === userId || match.requester.toString() === userId) {
      await Match.findByIdAndUpdate(req.params.id, { status: 'completed' });

      // إنشاء Transaction بعد الإكمال
      const amount = match.price || 50; // مثال: السعر الافتراضي أو من الـ match
      await Transaction.create({
        match: match._id,
        from: match.requester,
        to: match.talentOwner,
        amount,
        status: 'pending'
      });
    }

    // التوجيه لصفحة الفواتير بعد الإكمال
    res.redirect('/transactions');
  } catch (err) {
    console.log(err);
    res.redirect('/transactions');
  }
});

module.exports = router;
