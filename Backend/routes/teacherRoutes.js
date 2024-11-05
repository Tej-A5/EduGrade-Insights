const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Result = require('../models/Result');

const router = express.Router();

// Configure multer for file upload
const upload = multer({
    dest: path.join(__dirname, '../uploads') // Temporary directory for uploaded files
});

// Function to handle CSV data and update MongoDB
const handleCsvUpload = async (csvData, resultType, subject, year) => {
    for (const row of csvData) {
        const registrationId = row.registrationId;
        const marks = row.marks && !isNaN(row.marks) ? parseInt(row.marks, 10) : 0;

        // Find existing record for the student
        const result = await Result.findOne({ registrationId });

        if (result) {
            // Check if subject entry exists
            let subjectEntry = result.marks.find((entry) => entry.subject === subject);
            if (!subjectEntry) {
                // If the subject doesn't exist, add a new one
                subjectEntry = { subject, exams: [] };
                result.marks.push(subjectEntry);
            }

            // Check if exam entry exists for the specified type and year
            const examEntry = subjectEntry.exams.find((exam) => exam.type === resultType && exam.year === parseInt(year, 10));
            if (examEntry) {
                // Update the existing score
                examEntry.score = marks;
            } else {
                // Add a new exam entry
                subjectEntry.exams.push({
                    type: resultType,
                    year: parseInt(year, 10),
                    score: marks
                });
            }

            // Save the updated result document
            await result.save();
        } else {
            // If no result exists, create a new document
            await Result.create({
                registrationId,
                marks: [
                    {
                        subject,
                        exams: [
                            {
                                type: resultType,
                                year: parseInt(year, 10),
                                score: marks
                            }
                        ]
                    }
                ]
            });
        }
    }
};

// Route to handle CSV upload
router.post('/upload-csv', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const csvData = [];
    const resultType = req.body.resultType; // Get the result type from the request body
    const subject = req.body.subject; // Get the subject from the request body
    const year = req.body.year; // Get the year from the request body
    const filePath = req.file.path;

    // Validate that year is provided
    if (!year) {
        return res.status(400).json({ message: 'Year is required' });
    }

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', async () => {
            try {
                await handleCsvUpload(csvData, resultType, subject, year);
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
