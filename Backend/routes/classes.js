const express = require('express');
const Teacher = require('../models/Teacher'); // Adjust the path if necessary
const router = express.Router();

router.get('/classes/by-teacher', async (req, res) => {
    const teacherName = req.query.name;

    try {
        // Find teacher by name and project only the classes field
        const teacher = await Teacher.findOne({ name: teacherName }, 'classes');
        
        if (teacher) {
            res.json({ success: true, classes: teacher.classes });
            // console.log(teacher.classes);
        } else {
            res.status(404).json({ success: false, message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
