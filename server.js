const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('Received webhook:');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    // Send a response back to GitHub
    res.status(200).send('Webhook received successfully');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Webhook server is running on port ${PORT}`);
});
