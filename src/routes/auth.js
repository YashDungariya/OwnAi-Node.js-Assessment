const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password at least 6 characters'),
  body('role').isIn(['Admin','Staff']).withMessage('Role must be Admin or Staff'),
  body('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
  body('country').notEmpty().withMessage('Country is required')
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
], authController.login);

module.exports = router;
