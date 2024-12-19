const express = require('express');
const Teacher = require('../models/Teacher');

const router = express.Router();

// Route to add a new class entry to a teacher by email
router.post('/add-class', async (req, res) => {
    const { email, year, branch, subject } = req.query;
    // console.log("ggab");
    // console.log(email);
    // console.log(year);

    // console.log(branch);
    // console.log(subject);

    if (!email || !year || !branch || !subject) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the teacher by email and update their classes array
        // console.log("ad");
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { email },
            { $push: { classes: { year, branch, subject } } },
            { new: true }
        );
        // console.log(updatedTeacher);
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Class added successfully', teacher: updatedTeacher });
    } catch (error) {
        console.error('Error adding class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
