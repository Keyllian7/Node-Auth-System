const { handleError } = require('../helpers/failure');
const { registerUser, loginUser } = require('../services/authService');

const register = async (request, response) => {
    try {
        
        const { name, email, password } = request.body;
        userInformation = { name, email, password };
        await registerUser(userInformation, response);

    } catch (error) {
        handleError(response, error);
    }
}

const login = async (request, response) => {
    try {

        const { email, password } = request.body;
        loginInformation = { email, password };
        await loginUser(loginInformation, response);

    } catch (error) {
        handleError(response, error);
    }
}

module.exports = { register, login };