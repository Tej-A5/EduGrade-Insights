const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    department: { type: String, required: true },
    classes: [
        {
            year: { type: String, required: true },
            branch: { type: String, required: true },
            subject: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Teacher', teacherSchema);
