const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'mid-sem', 'end-sem'
    year: { type: Number, required: true },
    score: { type: Number, required: true }
});

const markSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    exams: [examSchema]
});

const resultSchema = new mongoose.Schema({
    registrationId: { type: String, required: true, unique: true },
    marks: [markSchema]
});

module.exports = mongoose.model('Result', resultSchema);