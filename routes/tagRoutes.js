// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Login Route
router.post('/create', tagController.createTag);
router.get('/all', tagController.getTags);
router.get('/:id', tagController.getTagById);
module.exports = router;
