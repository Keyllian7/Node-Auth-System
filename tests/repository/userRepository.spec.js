const mongoose = require('mongoose');
const userRepository = require('../../repository/userRepository');

jest.mock('mongoose', () => ({
    model: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        find: jest.fn(),
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
})