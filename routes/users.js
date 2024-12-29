const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const validateId = require('../middlewares/validateId');
const userController = require('../controllers/userController');
const { validateRequest } = require('../middlewares/validateRequest');
const { updateValidation } = require('../validations/userValidation');
const router = express.Router();
const files = require('../helpers/files');
const authorizationRole = require('../middlewares/authorizationRole');
const sanitizeRequest = require('../security/sanitize');
files('../swagger/user');

router.get('/list', verifyToken, authorizationRole('admin') ,userController.list);

router.delete('/remove/:id', verifyToken, validateId, userController.remove);

router.patch('/update/:id', sanitizeRequest, verifyToken, validateId, validateRequest(updateValidation), userController.update);

module.exports = router;