const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/authentication', authMiddleware.verifyToken, authController.sendSuccessResponse);

module.exports = router;