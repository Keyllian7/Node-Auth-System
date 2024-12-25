const mongoose = require('mongoose');

const database = () => {

    const place = process.env.NODE_URL == "production" ? "remote" : "local";

    const db = process.env.NODE_URL == "production"
        ? process.env.DATABASE_URL
        : "mongodb://localhost/mizulab";

    mongoose.connect(db).then(() => {
        console.log(`✅ Successfully connected to database ${place}!` );
    }).catch((err) => {
        console.log('❌ Error connecting to database: ' + err);
    });
};

module.exports = database;