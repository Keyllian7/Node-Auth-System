const userRepository = require('../repository/userRepository');
const { hashingPassword } = require('../helpers/password');

const updateUser = async (id, requestInformation) => {
    const { name, email, password } = requestInformation
    if (!password) {
        userInformation = { name, email };
        await userRepository.updateUser(id, userInformation);
    } else {
        const hashedPassword = await hashingPassword(password);
        const userInformation = { name, email, password: hashedPassword };
        await userRepository.updateUser(id, userInformation);
    }
}

const listUsers = async () => {
    return await userRepository.listUsers();
}

module.exports = { updateUser, listUsers }; 