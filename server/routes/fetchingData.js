const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Route to fetch data from a particular website
app.get('/fetch-data', async (req, res) => {
    try {

        // Make a GET request to the website
        const response = await axios.get('https://open.fda.gov/'); 

        // Extract the data you need from the response
        const data = response.data;

        // Send the data as the response
        res.status(200).json({ data });
    } catch (error) {
        // If there's an error, handle it and send an error response
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from the website.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
