const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mock user database
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find user in mock database
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful.', user });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
