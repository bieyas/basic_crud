const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');
const authenticateToken = require('../middlewares/auth'); // <-- Tambah ini

router.get('/', authenticateToken, userController.getAllUsers); // <-- Proteksi
router.get('/:id', authenticateToken, userController.getUserById);
router.post('/', authenticateToken, validateUser, userController.createUser);
router.put('/:id', authenticateToken, validateUser, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
