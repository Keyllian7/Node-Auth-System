const RegisterDto = require('../dto/user/registerDTO');
const LoginDto = require('../dto/user/loginDTO');
const { handleError } = require('../helpers/failure');
const { registerUser, loginUser } = require('../services/authService');

const register = async (request, response) => {
    try {
        
        const { name, email, password } = request.body;
        const registerDto = new RegisterDto(name, email, password);
        await registerUser(registerDto, response);

    } catch (error) {
        handleError(response, error);
    }
}

const login = async (request, response) => {
    try {

        const { email, password } = request.body;
        const loginDto = new LoginDto(email, password);
        await loginUser(loginDto, response);

    } catch (error) {
        handleError(response, error);
    }
}

module.exports = { register, login };