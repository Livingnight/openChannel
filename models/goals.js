const mongoose = require('mongoose');
const moment = require('moment');

const GoalSchema = new mongoose.Schema({
    author: {
        type: String
    },
    // userId:
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      default: ''
    },
    complete: {
        type: Boolean,
        default: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    created: {
        type: String,
        default: moment().format('DD/MM/YYYY')
    }
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;