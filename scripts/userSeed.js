const mongoose = require('mongoose');

const db = require('../models');

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/openChannel"
    );

const userSeed = [
    {
        email: "jjernigan1065@gmail.com",
        goals: []
    },
    {
        email: "orellanaleo8@gmail.com",
        goals: []
    },
    {
        email: "johnbarson@gmail.com",
        goals: []
    }
];

db.User
    .remove({})
    .then( () => db.User.insertMany(userSeed))
    .then( data => {
        console.log(data);
        process.exit(0);
    })
    .catch( err => {
        console.log(err);
        process.exit(1);
    })