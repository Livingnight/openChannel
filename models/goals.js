const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;