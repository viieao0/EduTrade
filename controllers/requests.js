const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const Talent = require('../models/talent');
const User = require('../models/user');
const Match = require('../models/match');

// إنشاء ريكوست جديد
router.post('/new', async (req, res) => {
  try {
    const { talentId, description } = req.body;
    const requesterId = req.session.userId;

    if (!talentId || !description) {
      return res.send('All fields required');
    }

    const talent = await Talent.findById(talentId).populate('student').lean();
    if (!talent) return res.send('Talent not found');

    // إنشاء الريكوست
    const request = await Request.create({
      talent: talentId,
      description,
      requester: requesterId
    });

    // إنشاء ماتش تلقائي بعد الريكوست
    await Match.create({
      request: request._id,
      talentOwner: talent.student._id, // صاحب الموهبة
      requester: requesterId,
      status: 'pending'
    });

    res.redirect('/matches');
  } catch (err) {
    console.log(err);
    res.send('Error creating request');
  }
});

// قائمة الريكوستات للطالب الحالي
router.get('/', async (req, res) => {
  const userId = req.session.userId;

  const requests = await Request.find({ requester: userId }) // بس اللي أرسلها الطالب
    .populate('requester') // بيانات الطالب اللي أرسل الريكوست
    .populate({
      path: 'talent',
      populate: { path: 'student' } // بيانات صاحب الموهبة
    })
    .lean();

  // Safety fallback
  requests.forEach(r => {
    r.requester = r.requester || { name: 'Unknown' };
    r.talent = r.talent || {};
    r.talent.student = r.talent.student || { name: 'Unknown' };
  });

  res.render('requests/index', { requests });
});

// صفحة إنشاء ريكوست جديد
router.get('/new', async (req, res) => {
  const talents = await Talent.find({}).populate('student').lean();

  // Safety fallback
  talents.forEach(t => {
    t.student = t.student || { name: 'Unknown' };
  });

  res.render('requests/new', { talents });
});

// إرسال ريكوست جديد
router.post('/new', async (req, res) => {
  const { talentId, description } = req.body;
  if (!talentId || !description) return res.redirect('/requests/new');

  await Request.create({
    talent: talentId,
    description,
    requester: req.session.userId
  });

  res.redirect('/requests');
});

module.exports = router;
