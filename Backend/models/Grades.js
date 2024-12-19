const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subject: { type: String, required: true }, // e.g., 'mid-sem', 'end-sem'
    score: { type: Number, required: true },
    credit: {type: Number, required: true}
});

const semSchema = new mongoose.Schema({
    sem: { type: Number, required: true },
    subjects: [subjectSchema]
});

const gradeSchema = new mongoose.Schema({
    registrationId: { type: String, required: true, unique: true },
    Semester: [semSchema]
});

module.exports = mongoose.model('Grade', gradeSchema);