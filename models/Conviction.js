const mongoose = require('mongoose');

const knownConvictionSchema = new mongoose.Schema({
  convictionType: String,
  convictionDate: Date,
  // Add other fields related to known convictions as needed
});

module.exports = mongoose.model('KnownConviction', knownConvictionSchema);
