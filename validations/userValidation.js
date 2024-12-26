const joi = require('joi');

const registerValidation = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    validationPassword: joi.string().valid(joi.ref('password')).required()
})

const loginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
})

const updateValidation = joi.object({
    name: joi.string().min(2).optional(),
    email: joi.string().email().optional(),
    password: joi.string().min(4).optional(),
    validationPassword: joi.string().valid(joi.ref('password'))
        .when('password',
            {
                is: joi.exist()
                , then: joi.required()
                , otherwise: joi.optional()
            }
        )
})

module.exports = { registerValidation, loginValidation, updateValidation };