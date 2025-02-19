const express = require('express');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');
const git = simpleGit();
const readline = require('readline');

const app = express();
const PORT = process.env.PORT || 3000;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getUserInput = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
    console.log('Received webhook:');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    try {
        // Get remote and branch from user input
        const remote = await getUserInput('Enter remote: ');
        const branch = await getUserInput('Enter branch: ');

        // Pull the latest changes from specified remote and branch
        console.log(`Pulling latest changes from ${remote}/${branch}...`);
        await git.pull(remote, branch);
        console.log(`Successfully pulled latest changes from ${remote}/${branch}`);
    
    } catch (error) {
        console.error('Error pulling changes:', error);
    }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Webhook server is running on port ${PORT}`);
});
