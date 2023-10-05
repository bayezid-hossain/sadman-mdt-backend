const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: String,
  batch: String,
  password: String, // Store the hashed password
  // Add other user fields as needed
});

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  try {
    // Generate a salt (a random string) to add to the password before hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Store the hashed password in the database
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
