const { check, validationResult } = require('express-validator');
const Tag = require('../models/Tags'); // Import your Tag model

const API_PATH = 'http://0.0.0.0:9984/api/v1/';
const alice = new driver.Ed25519Keypair();
const axios = require('axios');

const conn = new driver.Connection(API_PATH);
// Validation middleware for tagInfo
const validateTagInfo = [
  // Validate that the 'name' field is not empty and is a string
  check('name').notEmpty().isString(),

  // You can add more validation rules for other fields if needed

  // Custom validation: Check if the tag name already exists in the database
  check('name').custom(async (name) => {
    const existingTag = conn
      .searchAssets('Tag')
      .then((assets) => res.status(200).json(assets));
    if (existingTag) {
      throw new Error('Tag with this name already exists');
    }
    return true;
  }),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateTagInfo;
