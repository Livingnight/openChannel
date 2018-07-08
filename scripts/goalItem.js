const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect( process.env.MONGODB_URI ||
    'mongodb://localhost/openChannel'
)
// db.Goal.findById("5b414ddb10bead0bb4ec22a8")
//     .then( goal => {
//         console.log(goal);
//         db.Item.create({
//             text: "Silver likes carrots",
//             author: {
//                 id: goal.author.id,
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

db.Goal.findOne( {_id: "5b414ddb10bead0bb4ec22a8"})
    .populate('items')
.then( goal => {
    console.log(goal)
});