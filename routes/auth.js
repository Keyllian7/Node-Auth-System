const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const files = require('../helpers/files'); 
const { validateRequest } = require('../middlewares/validateRequest');
const { registerValidation, loginValidation } = require('../validations/userValidation');
const sanitizeRequest = require('../middlewares/sanitize');
files('../swagger/auth')

router.post('/register', sanitizeRequest, validateRequest(registerValidation), authController.register);

router.post('/login', sanitizeRequest, validateRequest(loginValidation) ,authController.login);

module.exports = router;