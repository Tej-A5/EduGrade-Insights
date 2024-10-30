const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
// const Student = require('../models/Student');
const Result = require('../models/Result');

const router = express.Router();

// Configure multer for file upload
const upload = multer({
    dest: path.join(__dirname, '../uploads') // Temporary directory for uploaded files
});

// Function to handle CSV data and update MongoDB
const handleCsvUpload = async (csvData, resultType) => {
    for (const row of csvData) {
        const registrationId = row.registrationId;
        const subject = row.subject;
        const marks = row.marks && row.marks !== '' ? parseInt(row.marks, 10) : null;

        const updateFields = {};
        updateFields[`marks.${subject}.${resultType}`] = marks;

        await Result.updateOne(
            { registrationId },
            { $set: updateFields },
            { upsert: true }
        );
    }
};

// const handleCsvUpload = async (csvData) => {
//     for (const row of csvData) {
//         const registrationId = row.registrationId;
//         const subject = row.subject;
//         const marks = row.marks && row.marks !== '' ? parseInt(row.marks, 10) : null;

//         // Check if the student already exists
//         const student = await Student.findOne({ registrationId });

//         if (student) {
//             // If the student exists, update the marks for the subject
//             if (marks !== null) {
//                 // Use $set to add/update the subject marks without removing existing subjects
//                 student.marks[subject] = marks; // Add or update the subject marks
//             } else {
//                 // If marks are null, set the value to null for that subject
//                 student.marks[subject] = null; // Set marks to null if provided marks are empty
//             }
//             await student.save(); // Save the updated student document
//         } else {
//             // If the student doesn't exist, create a new student record
//             const newStudent = new Student({
//                 registrationId,
//                 marks: {
//                     [subject]: marks // Create a new marks object with the subject
//                 }
//             });
//             await newStudent.save(); // Save the new student document
//         }
//     }
// };

// Route to handle CSV upload
router.post('/upload-csv', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const csvData = [];
    const resultType = req.body.resultType; // Get the result type from the request body
    const filePath = req.file.path;

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', async () => {
            try {
                await handleCsvUpload(csvData,resultType);
                res.status(200).json({ message: 'CSV uploaded and data updated successfully' });
                console.log('Data from CSV:', csvData);

            } catch (error) {
                console.error('Error processing CSV data:', error);
                res.status(500).json({ message: 'Error processing CSV data', error: error.message });
            } finally {
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting temporary file:', unlinkErr);
                }); // Clean up the temporary file
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Error reading CSV file', error: error.message });
        });
});

module.exports = router;
