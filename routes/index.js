// routes/index.js

const authRoutes = require('./authRoutes');
const citizenRoutes = require('./citizenRoutes');
const tagRoutes = require('./tagRoutes');
const incidentRoutes = require('./incidentRoutes');
module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/bigchaindb', citizenRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/incident', incidentRoutes);
};
