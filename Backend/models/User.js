const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Make sure to hash passwords before storing them
    role: { type: String, enum: ['student', 'teacher'], required: true }, // Field to determine role
});

module.exports = mongoose.model('User', userSchema);
