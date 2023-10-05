// models/incident.js
const mongoose = require('mongoose');
const tagsSchema = require('./Tags');
const userSchema = require('./User');
const citizenSchema = require('./Citizen');

const incidentSchema = new mongoose.Schema({
  // Store the hashed password
  title: String,
  typeOfIncident: String,
  details: String,
  civilians: [incidentSchema],
  tags: [tagsSchema], // Reference the Tags model // Reference the Licenses model
  images: [],
  officers: [userSchema], // Reference the KnownConviction model
  // Add other incident fields as needed
});

// Hash the incident's password before saving it to the database

module.exports = mongoose.model('Incident', incidentSchema);
