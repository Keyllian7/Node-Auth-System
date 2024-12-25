const express = require('express');
const cors = require('cors');
const database = require('./settings/database');
const corsSettings = require('./settings/cors');
const swaggerSetup = require('./swagger');
const auth = require('./routes/auth');
const users = require('./routes/users');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors(corsSettings));

// Mongoose connection
database();

app.get('/', (request, response) => {
    response.status(200).json({ message: 'Connected to api successfully!' });
});

app.use('/auth', auth);
app.use('/user', users)

// Swagger setup
swaggerSetup(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`🔵 Server running on port ${PORT}`);
});