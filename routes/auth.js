const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const files = require('../helpers/files'); 
const { validateRequest } = require('../middlewares/validateRequest');
const { registerValidation, loginValidation } = require('../validations/userValidation');
files('../swagger/auth')

router.post('/register', validateRequest(registerValidation), authController.register);

router.post('/login', validateRequest(loginValidation) ,authController.login);

module.exports = router;