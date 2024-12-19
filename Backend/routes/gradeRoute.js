const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Result = require('../models/Grades');

const router = express.Router();

// Configure multer for file upload
const upload = multer({
    dest: path.join(__dirname, '../uploads') // Temporary directory for uploaded files
});


const handleCsvUpload = async (csvData, sem, sub, credits) => {
    for (const row of csvData) {
        const registrationId = row.registrationId;
        const scores = row.scores && !isNaN(row.scores) ? parseInt(row.scores, 10) : 0;

        // Find existing record for the student
        const result = await Result.findOne({ registrationId });

        if (result) {
            // Check if subject entry exists
            // console.log(result);
            let semEntry = result.Semester.find((entry) => entry.sem == sem);
            // console.log(semEntry);
            if (!semEntry) {
                // If the subject doesn't exist, add a new one
                semEntry = { sem, subjects: [
                    {
                        subject: sub,
                        score: scores,
                        credit: credits
                    }
                ] };
                result.Semester.push(semEntry);
            }
            
            await result.save();
            // Check if exam entry exists for the specified type and year
            const subjectEntry = semEntry.subjects.find((subject) => subject.subject == sub);
            if (subjectEntry) {
                // Update the existing score
                subjectEntry.score = scores;
                subjectEntry.credit= credits;
            } else {
                // Add a new exam entry
                // console.log(semEntry.subjects);
                // semEntry.subjects.push({
                //     subject: sub,
                //     score: scores,
                //     credit: credits
                // });
                console.log(`Adding new subject ${sub} with score ${scores} and credit ${credits} to semester ${sem}`);
                semEntry.subjects.push({
                    subject: sub,
                    score: scores,
                    credit: credits
                });
                result.markModified('Semester'); // Mark Semester as modified
            }
            // console.log(subjectEntry);

            // Save the updated result document
            await result.save();
        } else {
            // If no result exists, create a new document
            await Result.create({
                registrationId,
                Semester: [
                    {
                        sem,
                        subjects: [
                            {
                                subject: sub,
                                score: scores,
                                credit: credits
                            }
                        ]
                    }
                ]
            });
        }
    }
};

// Route to handle CSV upload
router.post('/upload-grades', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const csvData = [];
    const semester = req.body.semester; // Get the result type from the request body
    const sub = req.body.subject; // Get the subject from the request body
    const credits = req.body.credits; // Get the year from the request body
    const filePath = req.file.path;

    // Validate that year is provided
    // if (!year) {
    //     return res.status(400).json({ message: 'Year is required' });
    // }

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', async () => {
            try {
                await handleCsvUpload(csvData, semester, sub, credits);
                res.status(200).json({ message: 'CSV uploaded and data updated successfully' });
            } catch (error) {
                console.error('Error processing CSV data:', error);
                res.status(500).json({ message: 'Error processing CSV data', error: error.message });
            } finally {
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting temporary file:', unlinkErr);
                });
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Error reading CSV file', error: error.message });
        });
});

module.exports = router;