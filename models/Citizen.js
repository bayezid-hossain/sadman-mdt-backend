// models/Citizen.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tagsSchema = require('./Tags');
const licensesSchema = require('./Licenses');
const knownConvictionSchema = require('./KnownConviction');

const citizenSchema = new mongoose.Schema({
  // Store the hashed password
  citizen_id: String,
  firstName: String,
  lastName: String,
  contactNumber: String,
  biometric: String,
  details: String,
  profession: String,
  dob: String,
  tags: [tagsSchema], // Reference the Tags model
  licenses: [licensesSchema], // Reference the Licenses model
  knownConvictions: [knownConvictionSchema], // Reference the KnownConviction model
  // Add other citizen fields as needed
});

// Hash the citizen's password before saving it to the database

module.exports = mongoose.model('Citizen', citizenSchema);
