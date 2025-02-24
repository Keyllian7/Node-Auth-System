const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 25,
    standardHeaders: true, 
	legacyHeaders: false, 
    message: 'Too many requests, please try again later.',
})

module.exports = limiter