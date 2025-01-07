const mongoose = require('mongoose');
const userRepository = require('../../repository/userRepository');

jest.mock('mongoose', () => ({
    model: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        find: jest.fn().mockReturnValue({
            select: jest.fn()
        }),
        deleteOne: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        save: jest.fn()
    })
}))

describe('User Repository Tests', () => {
    const User = mongoose.model('User');

    describe('searchUserByEmail', () => {
        it('Must find a user by email', async () => {
            const email = 'test@example.com';
            const user = { email: email };
            User.findOne.mockResolvedValue(user);

            const result = await userRepository.searchUserByEmail(email);

            expect(User.findOne).toHaveBeenCalledWith({ email: email });
            expect(result).toEqual(user);
        })
    })
    describe('listUsers', () => {
        it('Must list all users', async () => {
            const users = [
                { name: 'Jane', email: 'jane@example.com', password: '1234' },
                { name: 'John', email: 'jhon@example.com', password: '1234' },
                { name: 'Doe', email: 'doe@example.com', password: '1234' }
            ];
            const selectMock = jest.fn().mockResolvedValue(users);
            User.find.mockReturnValue({ select: selectMock });

            const result = await userRepository.listUsers();

            expect(User.find).toHaveBeenCalled();
            expect(selectMock).toHaveBeenCalledWith('-password -__v');
            expect(result).toEqual(users);
        })
    })
    describe('removeUser', () => {
        it('Must remove a user by id', async () => {
            const id = '12345678';
            const deleteResult = { deletedCount: 1 };
    
            User.deleteOne.mockResolvedValue(deleteResult);
    
            const result = await userRepository.removeUser(id);
    
            expect(User.deleteOne).toHaveBeenCalledWith({ _id: id });
            expect(result).toEqual(deleteResult);
        });
    });
    describe('searchUserById', () => {
        it('Must search a user by id', async () => {
            const id = '12345678'
            const user = {
                _id: id,
                name: 'Jane',
                email: 'jane@example.com'
            }

            User.findById.mockResolvedValue(user);

            const result = await userRepository.searchUserById(id);

            expect(User.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(user);

        })
        it('Must handle errors during user search by id', async () => {
            const id = '12345678';
            const error = new Error('Database error');

            User.findById.mockRejectedValue(error);

            await expect(userRepository.searchUserById(id)).rejects.toThrow(error);
        });
    })
    describe('updateUser', () => {
        it('Must update a user successfully', async () => {
            const id = '12345678';
            const userInformation = { name: 'Jane', email: 'jane@example.com' };
            const updatedUser = { _id: id, ...userInformation };

            User.findByIdAndUpdate.mockResolvedValue(updatedUser);

            const result = await userRepository.updateUser(id, userInformation);

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, userInformation);
            expect(result).toEqual(updatedUser);
        });

        it('Must handle errors during user update', async () => {
            const id = '12345678';
            const userInformation = { name: 'Jane', email: 'jane@example.com' };
            const error = new Error('Database error');

            User.findByIdAndUpdate.mockRejectedValue(error);

            await expect(userRepository.updateUser(id, userInformation)).rejects.toThrow(error);
        });
    });
})