const express = require('express');
const Result = require('../models/Result'); // Adjust the path if necessary

const router = express.Router();

// Endpoint to fetch only scores of all students based on subject, result type, and year
router.get('/marks', async (req, res) => {
    const { subject, resultType, year } = req.query;

    if (!subject || !resultType || !year) {
        return res.status(400).json({ error: 'Subject, result type, and year are required.' });
    }

    try {
        // Find all results that have the specified subject and exam type/year
        const results = await Result.find({
            marks: {
                $elemMatch: {
                    subject: subject,
                    exams: { $elemMatch: { type: resultType, year: parseInt(year, 10) } }
                }
            }
        }).lean();

        // Extract only scores for the specified subject, resultType, and year
        const scores = results
            .flatMap((result) => {
                const subjectEntry = result.marks.find((entry) => entry.subject === subject);
                if (subjectEntry) {
                    return subjectEntry.exams
                        .filter((exam) => exam.type === resultType && exam.year === parseInt(year, 10))
                        .map((exam) => exam.score);
                }
                return [];
            });

        if (scores.length === 0) {
            return res.status(404).json({ error: `No scores found for subject: ${subject}, result type: ${resultType}, year: ${year}` });
        }

        res.json({ scores });
    } catch (error) {
        console.error('Error fetching marks data:', error);
        res.status(500).json({ error: 'Error fetching marks data' });
    }
});

module.exports = router;
