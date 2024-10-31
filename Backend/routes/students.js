const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {

    const { registrationId, name, email, password,  course, year } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            registrationId,
            name,
            email,
            password: hashedPassword,
            course,
            year
        });
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
    } catch (error) {
        res.status(400).json({ message: 'Error registering student', error });
    }
});

module.exports = router;
