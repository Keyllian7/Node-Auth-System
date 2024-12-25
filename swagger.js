const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSettings = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Mizu-Lab API',
            version: '1.0.0',
            description: 'API for automation and systems management in the Mizu Cimentos laboratory',
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
        './swagger/users/*.js'
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerSettings);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};