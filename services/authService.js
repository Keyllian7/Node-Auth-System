const userRepository = require('../repository/userRepository');
const { hashingPassword, comparePassword } = require('../helpers/password');
const { handleError } = require('../helpers/failure');
const { generateToken } = require('../helpers/token');

async function registerUser(registerDto, response) {
    try {

        const { name, email, password } = registerDto;

        const existingUser = await userRepository.searchUserByEmail(email);
        if (existingUser) { return response.status(409).json({ message: 'User already exists!' }) }

        const hashedPassword = await hashingPassword(password);
        const newUser = { name, email, password: hashedPassword }

        await userRepository.createUser(newUser);
        return response.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        handleError(response, error);
    }
}

async function loginUser(loginDto, response) {
    try {

        const { email, password } = loginDto;

        const existingUser = await userRepository.searchUserByEmail(email);
        if (!existingUser) { return response.status(404).json({ message: 'User not found!' }) }

        const validPassword = await comparePassword(password, existingUser.password);
        if (!validPassword) { return response.status(401).json({ message: 'Invalid password!' }) }

        const token = await generateToken(existingUser._id)
        return response.status(200).json({ message: 'Login successful!', token });

    } catch (error) {
        handleError(response, error);
    }
}

module.exports = { registerUser, loginUser };