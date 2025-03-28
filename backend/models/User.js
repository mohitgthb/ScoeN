const mongoose = require('mongoose');
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    name: String,
    // username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchasedUnits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }], // Tracks purchased units
    // isVerified: { type: Boolean, default: false }, // Email verification status
    // verificationToken: { type: String } // Token for verification
});

module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
// });

// module.exports = mongoose.model('User', userSchema);