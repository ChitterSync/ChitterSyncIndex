const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB Atlas connection
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/chittersync?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Define a User schema
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    phone: String
});

// Create a User model
const User = mongoose.model('User', userSchema);

// API endpoint to check user
app.post('/api/check-user', async (req, res) => {
    const { username } = req.body;

    try {
        // Query the database for the user
        const user = await User.findOne({ username });

        if (user) {
            // Return the user profile if found
            res.json({
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone
            });
        } else {
            // Return a 404 if the user is not found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error querying MongoDB:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to upload user data
app.post('/api/upload-user', async (req, res) => {
    const { username, name, email, phone } = req.body;

    try {
        // Save the user to the database
        const newUser = new User({ username, name, email, phone });
        await newUser.save();

        res.status(201).json({ message: 'User uploaded successfully', user: newUser });
    } catch (error) {
        console.error('Error uploading user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});