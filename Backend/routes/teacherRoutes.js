// const express = require('express');
// const csvParser = require('csv-parser');
// const fs = require('fs');
// const multer = require('multer');
// const path = require('path');
// // const Student = require('../models/Student');
// const Result = require('../models/Result');

// const router = express.Router();

// // Configure multer for file upload
// const upload = multer({
//     dest: path.join(__dirname, '../uploads') // Temporary directory for uploaded files
// });

// // Function to handle CSV data and update MongoDB
// const handleCsvUpload = async (csvData, resultType) => {
//     for (const row of csvData) {
//         const registrationId = row.registrationId;
//         const subject = row.subject;
//         const marks = row.marks && row.marks !== '' ? parseInt(row.marks, 10) : null;

//         const updateFields = {};
//         updateFields[`marks.${subject}.${resultType}`] = marks;

//         await Result.updateOne(
//             { registrationId },
//             { $set: updateFields },
//             { upsert: true }
//         );
//     }
// };

// // Route to handle CSV upload
// router.post('/upload-csv', upload.single('file'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const csvData = [];
//     const resultType = req.body.resultType; // Get the result type from the request body
//     const filePath = req.file.path;

//     fs.createReadStream(filePath)
//         .pipe(csvParser())
//         .on('data', (row) => {
//             csvData.push(row);
//         })
//         .on('end', async () => {
//             try {
//                 await handleCsvUpload(csvData,resultType);
//                 res.status(200).json({ message: 'CSV uploaded and data updated successfully' });
//                 console.log('Data from CSV:', csvData);

//             } catch (error) {
//                 console.error('Error processing CSV data:', error);
//                 res.status(500).json({ message: 'Error processing CSV data', error: error.message });
//             } finally {
//                 fs.unlink(filePath, (unlinkErr) => {
//                     if (unlinkErr) console.error('Error deleting temporary file:', unlinkErr);
//                 }); // Clean up the temporary file
//             }
//         })
//         .on('error', (error) => {
//             console.error('Error reading CSV file:', error);
//             res.status(500).json({ message: 'Error reading CSV file', error: error.message });
//         });
// });

// module.exports = router;

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
const handleCsvUpload = async (csvData, resultType, year) => {
    for (const row of csvData) {
        const registrationId = row.registrationId;
        const subject = row.subject; // Get the subject from the CSV row
        const marks = row.marks && row.marks !== '' ? parseInt(row.marks, 10) : null;

        const updateFields = {};
        // Store marks based on subject and year
        updateFields[`marks.${subject}.${resultType}.${year}`] = marks;

        await Result.updateOne(
            { registrationId },
            { $set: updateFields },
            { upsert: true }
        );
    }
};

// Route to handle CSV upload
router.post('/upload-csv', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const csvData = [];
    const resultType = req.body.resultType; // Get the result type from the request body
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
                await handleCsvUpload(csvData, resultType, year); // Pass resultType and year to the function
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

