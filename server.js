const express = require('express');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');
const git = simpleGit();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
    console.log('Received webhook:');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    try {
        // Pull the latest changes
        console.log('Pulling latest changes...');
        await git.pull();
        console.log('Successfully pulled latest changes');
    
    } catch (error) {
        console.error('Error pulling changes:', error);
    }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Webhook server is running on port ${PORT}`);
});
