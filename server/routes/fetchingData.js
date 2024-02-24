const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// POST route for searching using an API
app.post('/search', async (req, res) => {
    try {
        // Retrieve search query from request body
        const { query } = req.body;

        // Make a request to the API for searching
        const response = await axios.get(`https://api.fda.gov/drug/label.json?serach=openfda.generic_name: ${query}`);

        // Extract the result from the API response
        const result = response.data;

        // Send the result as response
        res.status(200).json(result);
    } catch (error) {
        // If there's an error, handle it and send an error response
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Failed to search using the API.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
