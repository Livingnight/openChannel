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

// mongoose.connect( process.env.MONGODB_URI ||
//     'mongodb://localhost/openChannel'
// )
// db.Goal.findByItem("5b414ddb10bead0bb4ec22a8")
//     .then( item => {
//         console.log(item);
//         db.Item.create({
//             text: "Silver likes carrots",
//             author: {
//                 id: item,
//                 email: goal.author.email
//             }
//         }).then( goalItem => {
//             goal.items.push(goalItem);
//             goal.save();
//         })
//             .catch(err => {
//                 console.log(err);
//             })
//     })
const GoalItemSchema = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        required: true
    },

    goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoalItem"
    }]
});

const GoalItem = mongoose.model("Goal Item", GoalItemSchema);

modue.exports = GoalItem;

db.User.findOne({_id: "orellanaleo8@gmail.com"})
    .populate('GoalItems')
    .then(user => console.log(user.items))
    .catch(err => console.log(err));


