// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 9876;

// Enable CORS for all routes using the cors middleware
app.use(cors());

// Mapping of number IDs to API endpoints
const apiEndpoints = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/random'
};

// Define a route that will handle GET requests to /numbers/:numberid
app.get('/numbers/:numberid', async (req, res) => {
    const numberId = req.params.numberid;

    if (!apiEndpoints[numberId]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    try {
        const response = await axios.get(apiEndpoints[numberId]);
        const numbers = response.data.numbers;
        res.json({ numbers });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch numbers' });
    }
});

// Start the server and have it listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
