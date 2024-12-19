// routes/gradeRoutes.js
const express = require('express');
const Grade = require('../models/Grades'); // Adjust path if necessary

const router = express.Router();

// Route to get subject credits for a specific semester and registrationId
router.get('/credits', async (req, res) => {
    const { registrationId, semester } = req.query;

    if (!registrationId || !semester) {
        return res.status(400).json({ error: 'registrationId and semester are required.' });
    }

    try {
        // Find the grade document for the given registrationId
        const grade = await Grade.findOne({ registrationId });
        if (!grade) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Find the specified semester
        const semesterData = grade.Semester.find((sem) => sem.sem === parseInt(semester, 10));
        if (!semesterData) {
            return res.status(404).json({ error: 'Semester not found' });
        }

        // Extract subject credits for the semester
        const subjectCredits = semesterData.subjects.map((subject) => ({
            subject: subject.subject,
            credit: subject.credit,
        }));

        res.json({ subjectCredits });
    } catch (error) {
        console.error('Error fetching subject credits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
