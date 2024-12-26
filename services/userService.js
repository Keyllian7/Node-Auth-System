const userRepository = require('../repository/userRepository');
const { hashingPassword } = require('../helpers/password');
const { handleError } = require('../helpers/failure');

const removeUser = async (id, response) => {

    try {

        await userRepository.removeUser(id);
        return response.status(200).json({ message: 'User successfully removed!' });

    } catch (error) {
        return handleError(response, error);
    }	
}

const updateUser = async (id, requestInformation, response) => {
    try {
        const { name, email, password } = requestInformation
        let userInformation;
        if (password) {
            const hashedPassword = await hashingPassword(password);
            userInformation = { name, email, password: hashedPassword };
        } else {
            userInformation = { name, email };
        }
        
        await userRepository.updateUser(id, userInformation);
        return response.status(200).json({ message: 'User updated' })

    } catch (error) {
    return handleError(response, error);
}
}

const listUsers = async (response) => {
    try {
        users = await userRepository.listUsers();
        return response.status(200).json({ users });
    } catch (error) {
        return handleError(response, error);
    }
}

module.exports = { updateUser, listUsers, removeUser }; 