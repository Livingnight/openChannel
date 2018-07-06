const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

        username: {
            type: String,
            required: true,
            unique: true

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        goals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Goal"
            }
        ]

});
const User = mongoose.model("User", UserSchema);

module.exports = User;