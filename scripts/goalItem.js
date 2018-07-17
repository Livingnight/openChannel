const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect( process.env.MONGODB_URI ||
    'mongodb://localhost/openChannel'
)
db.Goal.findById("5b4a1c14353ecb28401bfd52")
    .then( goal => {
        console.log(goal);
        db.Item.create({
            text: "Silver likes carrots",
            author: goal.author.email

        }).then( goalItem => {
            goal.items.push(goalItem);
            goal.save();
        })
            .catch(err => {
                console.log(err);
            })
    });

    db.Goal.find( )
        .populate('items')

    .then( goal => {
        console.log(goal)
    });