const userRepository = require('../repository/userRepository');
const { hashingPassword } = require('../helpers/password');

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

const listUsers = async () => {
    return await userRepository.listUsers();
}

module.exports = { updateUser, listUsers }; 