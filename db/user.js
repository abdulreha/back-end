const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // optional: removes extra spaces
        lowercase: true // optional: normalizes case
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema); // Capitalized model name (convention)

module.exports = User;
