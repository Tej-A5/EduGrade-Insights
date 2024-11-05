const express = require('express');
const Result = require('../models/Result'); // Adjust the path if necessary

const router = express.Router();

router.get('/subjects', async (req, res) => {
    const { registrationId } = req.query;
    console.log('Received registrationId:', registrationId); // Log registrationId received from the request

    try {
        if (!registrationId) {
            return res.status(400).json({ error: 'registrationId is required' });
        }

        // Fetch the result document for the given registrationId
        const result = await Result.findOne({ registrationId }).lean();

        if (result && result.marks) {
            // Extract subjects from the `marks` array
            const subjects = result.marks.map((entry) => entry.subject);
            console.log('Subjects:', subjects); // Log extracted subjects

            res.json({ subjects });
        } else {
            res.status(404).json({ message: 'No subjects found for this registration ID' });
        }
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
