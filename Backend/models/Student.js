const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    registrationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    marks: { type: Map, of: Number } // Marks as a map with subject names as keys and scores as values
});

module.exports = mongoose.model('Student', studentSchema);
