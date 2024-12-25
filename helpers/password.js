const bcrypt = require('bcrypt');

async function hashingPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, loginPassword) {
    validPassword = await bcrypt.compare(password, loginPassword);
    return validPassword;
}

module.exports = { hashingPassword, comparePassword };