const { updateUser } = require('../../services/userService');
const userRepository = require('../../repository/userRepository');
const { hashingPassword } = require('../../helpers/password');
const { handleError } = require('../../helpers/failure');

jest.mock('../../repository/userRepository');
jest.mock('../../helpers/failure');
jest.mock('../../helpers/password', () => ({
    hashingPassword: jest.fn()
}));

describe("User Service : Tests", () => {
    let response;
    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe("updateUser", () => {
        it("Must update a user successfully", async () => {
            hashingPassword.mockResolvedValue('hashedPassword');
            userRepository.updateUser.mockResolvedValue();

            const requestInformation = { name: 'Jane', email: 'jane@example.com', password: 'password123' };
            await updateUser('userId', requestInformation, response);

            expect(hashingPassword).toHaveBeenCalledWith('password123');
            expect(userRepository.updateUser).toHaveBeenCalledWith('userId', {
                name: 'Jane',
                email: 'jane@example.com',
                password: 'hashedPassword'
            });
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ message: 'User updated' });
        });

        it("Must handle errors during user update", async () => {
            const error = new Error('Database error');
            userRepository.updateUser.mockRejectedValue(error);

            const requestInformation = { name: 'Jane', email: 'jane@example.com', password: 'password123' };
            await updateUser('userId', requestInformation, response);

            expect(handleError).toHaveBeenCalledWith(response, error);
        });
    });
});