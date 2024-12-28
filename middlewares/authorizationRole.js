function authorizationRole(role){
    return (request, response, next) => {
        if(request.user.role !== role){
            return response.status(403).json({ message: 'Access denied!' });
        }
        next();
    }
}

module.exports = authorizationRole;