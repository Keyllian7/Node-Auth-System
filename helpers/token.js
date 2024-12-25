const jwt = require('jsonwebtoken');

async function generateToken(user) {
    const jwtPassword = process.env.JWT_PASSWORD;
    const token = jwt.sign({ id: user }, jwtPassword, { expiresIn: '2h' });
    return token;
}

module.exports = { generateToken };