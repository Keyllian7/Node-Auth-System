const { handleError } = require('../helpers/failure');
const userRepository = require('../repository/userRepository');
const userService = require('../services/userService');


const list = async (request, response) => {
    try {
        users = await userRepository.listUsers();
        response.status(200).json({ users });
    } catch (error) {
        return handleError(response, error);
    }
}

const remove = async (request, response) => {
    try {
        const { id } = request.params;

        await userRepository.removeUser(id);
        response.status(200).json({ message: 'User successfully removed!' });
        
    } catch (error) {
        return handleError(response, error);
    }
}

const update = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, email, password, validationPassword } = request.body;
        const userInformation = { name, email, password };

        await userService.updateUser(id, userInformation);
        response.status(200).json({ message: 'User updated successfully!' });

    } catch (error) {
        return handleError(response, error);
    }
}

module.exports = { list, remove, update };