const mongoose = require('mongoose');

const db = require('../models');

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/openChannel"
    );

const userSeed = [
    {
        author: "jjernigan1065@gmail.com",
        allEmployee: true,
        title: 'testing all employess',
    },

];
    db.Goal
    .remove({})
    .then( () => db.Goal.insertMany(userSeed))
    .then( data => {
        console.log(data);
        process.exit(0);
    })
    .catch( err => {
        console.log(err);
        process.exit(1);
    })