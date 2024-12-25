const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const validateId = require('../middlewares/validateId');
const userController = require('../controllers/userController');
const { validateRequest } = require('../middlewares/validateRequest');
const { updateValidation } = require('../validations/userValidation');
const router = express.Router();

router.get('/list', verifyToken, userController.list);

router.delete('/remove/:id', verifyToken, validateId, userController.remove);

router.patch('/update/:id', verifyToken, validateId, validateRequest(updateValidation), userController.update);

module.exports = router;