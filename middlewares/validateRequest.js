const { validate } = require('../helpers/validate');

const validateRequest = (schema) => (req, res, next) => {
    const validationMessage = validate(schema, req.body);
    if (validationMessage) {
        return res.status(422).json({ message: validationMessage });
    }
    next();
};

module.exports = { validateRequest };