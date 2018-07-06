const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    text: {
        type: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String
    }

});

module.exports = mongoose.model('Item', ItemSchema);

