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
        title: 'Do you see any Teletubbies in here? Do you see a slender plastic tag\n' +
        'clipped to my shirt with my name printed on it? Do you see a little\n' +
        'Asian child with a blank expression on his face sitting outside on a\n' +
        'mechanical helicopter that shakes when you put quarters in it? No? Well,\n' +
        'that\'s what you see at a toy store. And you must think you\'re in a toy\n' +
        'store, because you\'re here shopping for an infant named Jeb.'

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