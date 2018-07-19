const mongoose = require('mongoose');
const moment = require('moment');

const ItemSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
    },
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    created: {
        type: String,
        default: moment().format('DD/MM/YYYY')
    }


});

module.exports = mongoose.model('Item', ItemSchema);

