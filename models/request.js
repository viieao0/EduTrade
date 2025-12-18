const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Talent',
    required: true
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: String,
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
