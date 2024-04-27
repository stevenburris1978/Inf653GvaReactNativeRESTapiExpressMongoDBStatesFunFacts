const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  stateCode: { type: String, required: true, unique: true },
  funfacts: [String],
  images: [String],
  date: Date,
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
