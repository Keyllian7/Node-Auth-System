const { handleError } = require('../helpers/failure');
const { updateUser, removeUser, listUsers } = require('../services/userService');
const UpdateDTO = require('../dto/user/updateDTO');

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
        const updateDto = new UpdateDTO(name, email, password);
        await updateUser(id, updateDto, response);

    } catch (error) {
        return handleError(response, error);
    }
}

module.exports = { list, remove, update };