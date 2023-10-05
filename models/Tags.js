const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Tag', tagSchema);
