const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    registrationId: { type: String, required: true, unique: true },
    marks: { type: Map, of: Number } // Marks as a map with subject names as keys and scores as values
});

module.exports = mongoose.model('Result', resultSchema);
