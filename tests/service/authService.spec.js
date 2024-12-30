const { registerUser } = require('../../services/authService');
const userRepository = require('../../repository/userRepository');
const { hashingPassword } = require('../../helpers/password');
const { generateToken } = require('../../helpers/token');

jest.mock('../../repository/userRepository');
jest.mock('../../helpers/password');
jest.mock('../../helpers/token');

describe('AuthService - registerUser', () => {
    let response;

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('should register a new user successfully', async () => {
        const registerDto = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        userRepository.searchUserByEmail.mockResolvedValue(null);
        hashingPassword.mockResolvedValue('hashedPassword');
        userRepository.createUser.mockResolvedValue();

        await registerUser(registerDto, response);

        expect(userRepository.searchUserByEmail).toHaveBeenCalledWith(registerDto.email);
        expect(hashingPassword).toHaveBeenCalledWith(registerDto.password);
        expect(userRepository.createUser).toHaveBeenCalledWith({
            name: registerDto.name,
            email: registerDto.email,
            password: 'hashedPassword'
        });
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ message: 'User created successfully!' });
    });

    it('should return 409 if user already exists', async () => {
        const registerDto = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        userRepository.searchUserByEmail.mockResolvedValue({});

        await registerUser(registerDto, response);

        expect(userRepository.searchUserByEmail).toHaveBeenCalledWith(registerDto.email);
        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.json).toHaveBeenCalledWith({ message: 'User already exists!' });
    });

    it('should handle errors', async () => {
        const registerDto = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        const error = new Error('Something went wrong');
        userRepository.searchUserByEmail.mockRejectedValue(error);

        await registerUser(registerDto, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ message: 'An internal server error occurred, please try again later!' });
    });
});