const express = require('express');
const cors = require('cors');
const connectDB = require('./db/dbconnection');
const Users = require('./db/user');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

// Register route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Save new user
        const user = new Users({ username, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User registration failed" });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check credentials
        const user = await Users.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
