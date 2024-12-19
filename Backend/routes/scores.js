const express = require('express');
const Result = require('../models/Result'); // Adjust the path if necessary

const router = express.Router();

// Route to get scores by registrationId
router.post('/scores', async (req, res) => {
    const { registrationId } = req.query;

    if (!registrationId) {
        return res.status(400).json({ message: 'registrationId is required' });
    }

    try {
        // Find the result document for the specified registrationId
        const result = await Result.findOne({ registrationId }).lean();

        if (!result) {
            return res.status(404).json({ message: 'No results found for this registration ID' });
        }

        res.json({ scores: result.marks });
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
