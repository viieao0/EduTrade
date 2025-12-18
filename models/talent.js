const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  course: { type: String, required: true },
  description: String,
  yearLevel: String,
  hourlyRate: Number,
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Talent', talentSchema);
