const jwt = require('jsonwebtoken');

function verifyToken(request, response, next) {
    const header = request.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) { return response.status(401).json({ message: 'Access denied!' }) }

    try {
        const jwtPassword = process.env.JWT_PASSWORD;
        jwt.verify(token, jwtPassword)
        next();
    } catch(err) { return response.status(401).json({ message: 'Invalid token!' })}

}

module.exports = verifyToken;