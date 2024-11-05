const express = require('express');
const bcrypt = require('bcrypt');
const Teacher = require('../models/Teacher');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, department, classes } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            department,
            classes,
        });

        const savedTeacher = await newTeacher.save();
        res.status(201).json({ message: 'Teacher registered successfully', teacher: savedTeacher }); // Make sure this returns the saved teacher
    } catch (error) {
        console.error('Error registering teacher:', error);
        res.status(400).json({ message: 'Error registering teacher', error: error.message }); // Return error message
    }
});


module.exports = router;
