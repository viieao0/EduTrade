const express = require('express');
const router = express.Router();
const Talent = require('../models/talent');

// Show all talents
router.get('/', async (req, res) => {
  const talents = await Talent.find().populate('student').lean();
  res.render('talents/index', { talents });
});

// Show new talent form
router.get('/new', (req, res) => {
  res.render('talents/new');
});

// Create new talent
router.post('/new', async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.create({
    course,
    description,
    hourlyRate,
    student: req.session.userId
  });
  res.redirect('/talents');
});

module.exports = router;
