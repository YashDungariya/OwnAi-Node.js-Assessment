const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const userController = require('../controllers/userController');

// List users (Admin only) with optional ?search=&country=
router.get('/', authenticate, authorizeAdmin, userController.listUsers);

// Get user details by id (Admin any user, Staff only own)
router.get('/:id', authenticate, userController.getUserDetails);

module.exports = router;


