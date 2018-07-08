const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/openChannel'
)

// const userGoal = {
//     author: {
//         author: {
//             id: user._id,
//             email: user.email
//         },
//         title: "Hi Ho Silver",
//         items: []
//
//     }
// }

// db.Goal.create({
//     title: "Hi Ho Silver"
// })
// db.User.findById("5b40ea1ebbcc131ae0e54d95")
//     .then(user => {
//         console.log(user);
//         db.Goal.create({
//             author: {
//                 id: user._id,
//                 email: user.email
//             },
//             title: "Hi Ho Silver",
//             items: []
//
//         })
//             .then(goalItem => {
//                 // console.log(`Goal Item: ${goalItem}`)
//                 console.log(`Goal item: ${user.email}`);
//                 user.goals.push(goalItem);
//                 user.save();
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     });
db.User.findOne({"email":"jjernigan1065@gmail.com"})
 .populate('goals')
.then(user => console.log(user.goals))
.catch( err => console.log(err));