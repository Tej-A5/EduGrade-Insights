const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

// Register a new teacher
router.post('/register', async (req, res) => {
    const { name, email, department, experience, classes } = req.body;

    try {
        const newTeacher = new Teacher({
            name,
            email,
            department,
            experience,
            classes,
        });

        await newTeacher.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        console.error('Error registering teacher:', error);
        res.status(500).json({ error: 'Failed to register teacher' });
    }
});

module.exports = router;
