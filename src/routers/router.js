const Router = require('express');
const router = new Router();
const AuthController = require('../controllers/authController/index');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/emailAccept', authMiddleware, AuthController.emailAccept)

module.exports = router;