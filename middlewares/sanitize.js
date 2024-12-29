const sanitizeHtml = require('sanitize-html');

const sanitizeRequest = (req, res, next) => {
    const sanitize = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = sanitizeHtml(obj[key].replace(/[^a-zA-Z0-9 @.]/g, ''));
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitize(obj[key]);
            }
        }
    };

    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);

    next();
};

module.exports = sanitizeRequest;