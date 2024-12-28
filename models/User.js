const mongoose = require('mongoose');
const RolesEnum = require('../enums/Roles');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(RolesEnum),
        required: false,
        default: RolesEnum.USER
    }
});

module.exports = User;