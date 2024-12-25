const { isValidObjectId } = require('mongoose');
const userRepository = require('../repository/userRepository');

async function validateId(request, response, next) {
    if (!isValidObjectId(request.params.id)) { return response.status(400).json({ message: 'Invalid id' }) }
    const user = await userRepository.searchUserById(request.params.id);
    if (!user) { return response.status(404).json({ message: 'User not found' }) }
    next()
}

module.exports = validateId;