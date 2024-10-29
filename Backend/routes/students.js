const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
    } catch (error) {
        res.status(400).json({ message: 'Error registering student', error });
    }
});

module.exports = router;
