const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    text: {
        type: String
    },
    author: String,
    complete: {
        type: Boolean,
        default: false
    }


});

module.exports = mongoose.model('Item', ItemSchema);

