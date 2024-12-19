// routes/gradeRoutes.js
const express = require('express');
const Grade = require('../models/Grades'); // Adjust path if necessary

const router = express.Router();

// Route to calculate SGPA for each semester for a specific registrationId
router.get('/sgpa/all', async (req, res) => {
    const { registrationId } = req.query;

    if (!registrationId) {
        return res.status(400).json({ error: 'registrationId is required.' });
    }

    try {
        // Find the specific grade document for the registrationId
        const grade = await Grade.findOne({ registrationId });
        if (!grade) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const sgpaData = grade.Semester.map((semData) => {
            let totalScoreCredit = 0;
            let totalCredits = 0;

            // Calculate SGPA for each subject in the semester
            semData.subjects.forEach((subject) => {
                totalScoreCredit += subject.score * subject.credit;
                totalCredits += subject.credit;
            });

            // Ensure there are credits to avoid division by zero
            const sgpa = totalCredits > 0 ? (totalScoreCredit / totalCredits).toFixed(2) : 0;

            return {
                semester: semData.sem,
                sgpa: parseFloat(sgpa) // Convert to float for frontend compatibility
            };
        });

        res.json({ sgpaData });
    } catch (error) {
        console.error('Error calculating SGPA:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
