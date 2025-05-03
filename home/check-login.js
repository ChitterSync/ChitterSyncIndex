// Function to check if the user is logged in
async function checkLogin() {
    const token = getCookie('authToken');
    if (!token) {
        window.location.href = '/signin.html';
        return;
    }

    try {
        // Send a POST request to validate the token
        const response = await fetch('/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (!data.valid) {
            window.location.href = '/signin.html';
        }
    } catch (error) {
        console.error('Error validating token:', error);
        window.location.href = '/signin.html';
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

// Run the check on page load
checkLogin();
