const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  talentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
