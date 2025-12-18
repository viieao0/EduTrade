const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    res.locals.user = null;
    return next();
  }
  try {
    const user = await User.findById(req.session.userId).lean();
    res.locals.user = user;
    next();
  } catch {
    res.locals.user = null;
    next();
  }
};
