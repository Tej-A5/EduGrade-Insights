// // routes/marksRoutes.js
// const express = require('express');
// const Result = require('../models/Result'); // Adjust the path based on your project structure

// const router = express.Router();

// // Endpoint to fetch marks based on subject and result type
// router.get('/marks', async (req, res) => {
//     const { subject, resultType } = req.query;

//     try {
//         // Find students with the specific marks for the given subject and result type
//         const marksData = await Result.find({ [`marks.${subject}.${resultType}`]: { $exists: true } })
//             .select(`marks.${subject}.${resultType}`)
//             .exec();

//         // Extract marks data
//         const marks = marksData.map((result) => result.marks[subject][resultType]);
//         res.json({ marks });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching marks data' });
//     }
// });

// module.exports = router;

// routes/marksRoutes.js
// const express = require('express');
// const Student = require('../models/Result');

// const router = express.Router();

// // Endpoint to fetch marks based on subject and result type
// router.get('/marks', async (req, res) => {
//     const { subject, resultType } = req.query;

//     if (!subject || !resultType) {
//         return res.status(400).json({ error: 'Both subject and resultType are required.' });
//     }

//     try {
//         // Dynamically build the field path for the specific marks data
//         const fieldPath = `marks.${resultType}.${subject}`;
        
//         // Query for students with marks for the specified subject and result type
//         const students = await Student.find({ [fieldPath]: { $exists: true } })
//             .select({ [fieldPath]: 1, _id: 0 })
//             .lean()
//             .exec();

//         // Extract the marks for each student
//         const marks = students.map((student) => {
//             const resultData = student.marks?.[resultType]?.[subject];
//             return resultData !== undefined ? resultData : null; // Handle undefined values gracefully
//         });

//         res.json({ marks });
//     } catch (error) {
//         console.error('Error fetching marks data:', error); // Add error logging for troubleshooting
//         res.status(500).json({ error: 'Error fetching marks data' });
//     }
// });

// module.exports = router;

// routes/marksRoutes.js
const express = require('express');
const Student = require('../models/Result');

const router = express.Router();

// Endpoint to fetch marks based on subject and result type
router.get('/marks', async (req, res) => {
    const { subject, resultType } = req.query;

    if (!subject || !resultType) {
        return res.status(400).json({ error: 'Both subject and resultType are required.' });
    }

    try {
        // Retrieve the full marks object and filter in JavaScript
        const students = await Student.find({ [`marks.${subject}`]: { $exists: true } })
            .select({ [`marks.${subject}.${resultType}`]: 1, _id: 0 })
            .lean()
            .exec();

        // Extract the relevant marks for the specified subject and result type
        const marks = students
            .map((student) => student.marks?.[subject]?.[resultType])
            .filter((mark) => mark !== undefined); // Remove undefined entries

        res.json({ marks });
    } catch (error) {
        console.error('Error fetching marks data:', error);
        res.status(500).json({ error: 'Error fetching marks data' });
    }
});

module.exports = router;
