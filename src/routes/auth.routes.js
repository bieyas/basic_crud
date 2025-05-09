const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // Assuming you have a logout function in your controller

module.exports = router;