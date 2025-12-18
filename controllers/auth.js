const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Helper: email جامعي
function isUniversityEmail(email) {
  return email && (email.endsWith('.edu') || email.includes('@stu'));
}

// ===== Register =====
router.get('/register', (req, res) => {
  res.render('auth/register', { error: null });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render('auth/register', { error: 'All fields required' });
  }

  if (!isUniversityEmail(email)) {
    return res.render('auth/register', { error: 'Must use a university email' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.render('auth/register', { error: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed });

  req.session.userId = user._id;
  res.redirect('/dashboard');
});

// ===== Login =====
router.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('auth/login', { error: 'All fields required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.render('auth/login', { error: 'User not found' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render('auth/login', { error: 'Wrong password' });
  }

  req.session.userId = user._id;
  res.redirect('/dashboard');
});

// ===== Logout =====
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
