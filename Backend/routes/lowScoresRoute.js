const express = require('express');
const Result = require('../models/Result'); // Adjust the path if necessary

const router = express.Router();

// Endpoint to fetch the 5 lowest scores of a specific subject, result type, and year
router.get('/lowest-scores', async (req, res) => {
    const { subject, resultType, year } = req.query;

    if (!subject || !resultType || !year) {
       
        return res.status(400).json({ error: 'Subject, result type, and year are required.' });
        
    }
    // console.log("1");
    try {
        const yearInt = parseInt(year, 10);

        // Find all results that contain the specified subject and exam type in the given year
        const results = await Result.find({
            marks: {
                $elemMatch: {
                    subject: subject,
                    exams: { $elemMatch: { type: resultType, year: yearInt } }
                }
            }
        }).lean();
        // console.log(results);


        // Extract scores and registration IDs
        const studentScores = results.flatMap((result) => {
            return result.marks
                .filter((mark) => mark.subject === subject)
                .flatMap((mark) =>
                    mark.exams
                        .filter((exam) => exam.type === resultType && exam.year === yearInt)
                        .map((exam) => ({
                            registrationId: result.registrationId,
                            score: exam.score
                        }))
                );
        });

        // Sort by score in ascending order and get the 5 lowest scores
        const lowestScores = studentScores.sort((a, b) => a.score - b.score).slice(0, 5);

        if (lowestScores.length === 0) {
            return res.status(404).json({ message: `No scores found for subject: ${subject}, result type: ${resultType}, year: ${year}` });
        }

        res.json({ lowestScores });
    } catch (error) {
        console.error('Error fetching lowest scores:', error);
        res.status(500).json({ error: 'Error fetching lowest scores' });
    }
});

module.exports = router;
