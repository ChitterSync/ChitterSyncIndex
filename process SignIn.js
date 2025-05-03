// Get the signin form elements
const signinForm = document.querySelector('.login form');
const loginIdInput = document.querySelector('.login input[name="Login ID"]');
const passwordInput = document.querySelector('.login input[type="password"]');
const signinButton = document.querySelector('.login button');

// Add event listener to the signin button
signinButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const loginId = loginIdInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate the input fields
    if (loginId === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    try {
        // Send a POST request to the server to authenticate the user
        const response = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginId, password }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Login successful!');
            document.cookie = `authToken=${data.token}; path=/; Secure; HttpOnly`;
            window.location.href = '/home/index.html';
        } else {
            alert('Invalid Login ID or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});

// Logout function
async function logout() {
    const token = getCookie('authToken');
    if (!token) return;

    try {
        // Send a POST request to the server to log out
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        // Clear the cookie and redirect to the login page
        document.cookie = 'authToken=; Max-Age=0; path=/;';
        window.location.href = '/signin.html';
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Utility function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return value;
    }
    return null;
}

app.post('/signin', (req, res) => {
    const { loginId, password } = req.body;
    const userIp = req.ip; // Get the user's IP address

    const usersFilePath = './user.json';
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    const user = users.find((u) => u.login_id === loginId && u.password === password);
    if (user) {
        const token = generateToken();

        // Add or update the token for the user's IP address
        if (!user.token) {
            user.token = {};
        }
        user.token[userIp] = token;

        // Write the updated users array back to the JSON file
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        // Set the token as a cookie
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});