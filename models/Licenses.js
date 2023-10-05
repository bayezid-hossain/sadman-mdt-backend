// models/Licenses.js
const mongoose = require('mongoose');

const licensesSchema = new mongoose.Schema({
  type: String,
  expirationDate: Date,
  // Add other license-related fields as needed
});

module.exports = mongoose.model('Licenses', licensesSchema);
