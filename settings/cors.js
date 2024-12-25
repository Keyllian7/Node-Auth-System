const corsSettings = {
    origin: '*',
    methods: ['GET, POST, PUT, DELETE'],
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true
};

module.exports = corsSettings;