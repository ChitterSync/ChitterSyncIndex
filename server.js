const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Utility function to encrypt tokens
function encryptToken(token) {
    const cipher = crypto.createCipher('aes-256-cbc', 'secret-key');
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Utility function to decrypt tokens
function decryptToken(encryptedToken) {
    const decipher = crypto.createDecipher('aes-256-cbc', 'secret-key');
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Generate a new token
function generateToken() {
    return crypto.randomBytes(16).toString('hex');
}

// Utility function to generate a unique account ID
function generateAccountId() {
    return crypto.randomBytes(8).toString('hex'); // 16-character unique ID
}

// Endpoint to handle signup
app.post('/signup', (req, res) => {
    const { loginId, password, email, phone, username, name, contentGuidelines } = req.body;

    // Validate required fields
    if (!loginId || !password || !email || !phone || !username || !name) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Read existing users from the JSON file
    const usersFilePath = './users.json';
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');
        users = JSON.parse(usersData);
    }

    // Check for duplicate email, phone, or username
    const duplicateUser = users.find(
        (user) => user.email === email || user.phone === phone || user.username === username
    );
    if (duplicateUser) {
        return res.status(409).json({ success: false, message: 'Email, phone, or username already in use.' });
    }

    // Generate a unique account ID and token
    const accountId = generateAccountId();
    const token = crypto.randomBytes(16).toString('hex');

    // Create a new user object
    const newUser = {
        accountId,
        loginId,
        password, // In production, hash the password before storing it
        email,
        phone,
        username,
        name,
        contentGuidelines,
        token,
        createdAt: new Date().toISOString(),
    };

    // Add the new user to the users array
    users.push(newUser);

    // Write the updated users array back to the JSON file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Respond with success and the generated token
    res.status(201).json({ success: true, token });
});

// Endpoint to handle login
app.post('/signin', (req, res) => {
    const { loginId, password } = req.body;

    // Validate login credentials (mock validation for simplicity)
    if (loginId === 'test' && password === 'password') {
        const token = generateToken();
        const encryptedToken = encryptToken(token);

        // Write the encrypted token to tokens.txt
        fs.appendFileSync('tokens.txt', `${encryptedToken}\n`);

        // Set the token as a cookie
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Endpoint to validate tokens
app.post('/validate-token', (req, res) => {
    const { token } = req.body;

    // Read tokens from tokens.txt
    const tokens = fs.readFileSync('tokens.txt', 'utf8').split('\n').filter(Boolean);

    // Encrypt the provided token and check if it exists in the file
    const encryptedToken = encryptToken(token);
    if (tokens.includes(encryptedToken)) {
        res.status(200).json({ valid: true });
    } else {
        res.status(401).json({ valid: false });
    }
});

// Endpoint to handle logout
app.post('/logout', (req, res) => {
    const { token } = req.body;

    // Read tokens from tokens.txt
    let tokens = fs.readFileSync('tokens.txt', 'utf8').split('\n').filter(Boolean);

    // Encrypt the provided token and remove it from the file
    const encryptedToken = encryptToken(token);
    tokens = tokens.filter((t) => t !== encryptedToken);

    // Write the updated tokens back to tokens.txt
    fs.writeFileSync('tokens.txt', tokens.join('\n'));

    // Clear the cookie
    res.clearCookie('authToken');
    res.status(200).json({ success: true });
});

// Endpoint to validate the user profile
app.post('/validate-profile', (req, res) => {
    const { username, loginId } = req.body;

    if (!username || !loginId) {
        return res.status(400).json({ isValid: false, message: 'Invalid request data.' });
    }

    let isValid = false;

    fs.createReadStream('profile.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.username === username && row.loginId === loginId) {
                isValid = true;
            }
        })
        .on('end', () => {
            if (isValid) {
                res.status(200).json({ isValid: true });
            } else {
                res.status(401).json({ isValid: false });
            }
        })
        .on('error', (err) => {
            console.error('Error reading CSV file:', err);
            res.status(500).json({ isValid: false, message: 'Internal server error.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
