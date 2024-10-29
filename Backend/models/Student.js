const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    registrationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
