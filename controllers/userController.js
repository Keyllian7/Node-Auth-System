const { handleError } = require('../helpers/failure');
const { updateUser, removeUser, listUsers } = require('../services/userService');

const list = async (request, response) => {
    try {

        await listUsers(response);

    } catch (error) {
        return handleError(response, error);
    }
}

const remove = async (request, response) => {
    try {

        const { id } = request.params;
        await removeUser(id, response);

    } catch (error) {
        return handleError(response, error);
    }
}

const update = async (request, response) => {
    try {

        const { id } = request.params;
        const { name, email, password } = request.body;
        const userInformation = { name, email, password };
        await updateUser(id, userInformation, response);

    } catch (error) {
        return handleError(response, error);
    }
}

module.exports = { list, remove, update };