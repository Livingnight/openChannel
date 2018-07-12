const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        email: String

    },
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