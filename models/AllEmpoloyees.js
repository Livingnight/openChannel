const mongoose = require('mongoose');
const moment = require('moment');

const AllEmployeeSchema = new mongoose.Schema({
    author: {
        type: String
    },
    allEmployee: {
        type: String,
        default: 'AllEmployees'
    },
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
        default: moment()
    }

});
const AllEmployee = mongoose.model("User", AllEmployeeSchema);

module.exports = AllEmployee;