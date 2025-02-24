function validate (schema, data) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        return error.details.map(detail => detail.message).join(', ');
    }
    return null;
};

module.exports = { validate };