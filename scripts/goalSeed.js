const mongoose = require('mongoose');
const db = require('../models');

// mongoose.connect(
//     process.env.MONGODB_URI ||
//     'mongodb://localhost/openChannel'
// )

const GoalSchema = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        required: true
    },

    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
db.User.findOne({"email":"jjernigan1065@gmail.com"})
 .populate('goals')
.then(user => console.log(user.goals))
.catch( err => console.log(err));