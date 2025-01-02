const { registerUser } = require('../../services/authService');
const userRepository = require('../../repository/userRepository');
const { hashingPassword } = require('../../helpers/password');
const { handleError } = require('../../helpers/failure');
const { json } = require('express');

jest.mock('../../repository/userRepository.js'); // Mock do módulo
jest.mock('../../helpers/failure'); // Mock da função de tratamento de erro
jest.mock('../../helpers/password', () => ({
    hashingPassword: jest.fn()
}));

describe("User Authentication : Tests", () => {
    let response;
    beforeEach(() => {
        // Mock do objeto response
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it("Must register a user successfully", async () => {
        userRepository.searchUserByEmail.mockResolvedValue(null);
        hashingPassword.mockResolvedValue('hashedPassword');
        userRepository.createUser.mockResolvedValue();

        const registerDto = { name: 'Jane', email: 'jane@example.com', password: 'password123' };
        await registerUser(registerDto, response);

        // Verificações
        expect(userRepository.createUser).toHaveBeenCalledWith({
            name: 'Jane',
            email: 'jane@example.com',
            password: 'hashedPassword'
        });
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ message: 'User created successfully!' });
    });
    it("Must return an error when trying to register a user with an existing email", async () => {
        userRepository.searchUserByEmail.mockResolvedValue({ email: 'jane@example.com' });

        const registerDto = { name: 'Jane', email: 'jane@example.com', password: 'password123' };
        await registerUser(registerDto, response);

        // Verificações
        expect(userRepository.searchUserByEmail).toHaveBeenCalledWith('jane@example.com');
        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.json).toHaveBeenCalledWith({ message: 'User already exists!' });
    });
});