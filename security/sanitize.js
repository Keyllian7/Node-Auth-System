const sanitizeHtml = require('sanitize-html');

const sanitizeRequest = (request, res, next) => {
    const sanitize = (object) => {
        for (let key in object) {
            if (typeof object[key] === 'string') {
                object[key] = sanitizeHtml(object[key].replace(/[^a-zA-Z0-9 @.]/g, ''));
            } else if (typeof object[key] === 'object' && object[key] !== null) {
                sanitize(object[key]);
            }
        }
    };

    sanitize(request.body);
    sanitize(request.query);
    sanitize(request.params);

    next();
};

module.exports = sanitizeRequest;