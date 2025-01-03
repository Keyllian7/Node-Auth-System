const { updateUser, listUsers, removeUser } = require('../../services/userService');
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

    describe("listUsers", () => {
        it("Must list users successfully", async () => {
            const users = [{ name: 'Jane', email: 'jane@example.com' }];
            userRepository.listUsers.mockResolvedValue(users);

            await listUsers(response);

            expect(userRepository.listUsers).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ users });
        });

        it("Must handle errors during listing users", async () => {
            const error = new Error('Database error');
            userRepository.listUsers.mockRejectedValue(error);

            await listUsers(response);

            expect(handleError).toHaveBeenCalledWith(response, error);
        });
    });

    describe("removeUser", () => {
        it("Must remove a user successfully", async () => {
            userRepository.removeUser.mockResolvedValue();

            await removeUser('userId', response);

            expect(userRepository.removeUser).toHaveBeenCalledWith('userId');
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ message: 'User successfully removed!' });
        });

        it("Must handle errors during user removal", async () => {
            const error = new Error('Database error');
            userRepository.removeUser.mockRejectedValue(error);

            await removeUser('userId', response);

            expect(handleError).toHaveBeenCalledWith(response, error);
        });
    });
});