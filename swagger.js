const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSettings = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User authentication system ',
            version: '1.0.0',
            description: 'Basic user authentication system developed in Node.js',
            contact: {
                name: 'Keyllian Azevedo',
            },
            servers: [
                {
                    url: 'http://localhost:8081',
                    description: 'Local server'
                }
            ],
        },
    },
    apis: [
        './routes/*.js',
        './models/*.js',
        './swagger/auth/*.js',
        './swagger/equipment/*.js',
        './swagger/user/*.js'
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerSettings);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};