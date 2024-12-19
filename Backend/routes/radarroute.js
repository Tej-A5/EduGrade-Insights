const express = require('express');
const Result = require('../models/Result');

const router = express.Router();

router.get('/radar-chart-data', async (req, res) => {
    const { registrationId, examType } = req.query;

    if (!registrationId || !examType) {
        return res.status(400).json({ error: 'registrationId and examType are required' });
    }

    try {
        const result = await Result.findOne({ registrationId });

        if (!result) {
            return res.status(404).json({ error: 'No results found for the given registration ID' });
        }

        // Filter marks for the requested exam type
        const subjectsData = result.marks.map((subjectEntry) => {
            const exam = subjectEntry.exams.find((examEntry) => examEntry.type === examType);
            return exam ? { subject: subjectEntry.subject, score: exam.score } : null;
        }).filter((entry) => entry !== null);

        if (subjectsData.length === 0) {
            return res.status(404).json({ error: 'No data found for the specified exam type' });
        }

        res.json({ data: subjectsData });
    } catch (error) {
        console.error('Error fetching radar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
