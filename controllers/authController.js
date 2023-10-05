// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Authentication Logic
exports.login = async (req, res) => {
  const { email, batch, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email, batch });

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Authentication failed. User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Authentication failed. Wrong password.' });
    }

    // If the password is correct, generate a JWT token with the email and batch number
    const token = jwt.sign(
      { email: user.email, batch: user.batch }, // Include email and batch in the token payload
      'your-secret-key',
      {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      }
    );

    // Return the token and batch number in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
};

exports.register = async (req, res) => {
  const { email, batch, password } = req.body;
  const newUser = new User({
    email,
    batch,
    password,
  });

  // Validate username and password against the database
  try {
    await newUser.save();
    console.log('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
  }
  // Generate and return a JWT token
  const token = jwt.sign(
    { email: newUser.email, batch: newUser.batch, password: newUser.password },
    'your-secret-key'
  );
  res.json({ token });
};
