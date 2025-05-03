// Wrap in DOMContentLoaded to ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  } else {
    console.error('Form not found');
  }
});

// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; Secure; HttpOnly`;
}

// Function to generate a token
function generateToken() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Function to send the user data to the server
async function sendUserDataToServer(userData) {
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to send user data to the server');
    }

    const data = await response.json();
    return data.token; // Return the generated token
  } catch (error) {
    console.error('Error sending user data to the server:', error.message);
    throw error;
  }
}

// Function to validate user input
function validateInput(input) {
  if (!input || input.trim() === '') {
    throw new Error('Invalid input');
  }
  return DOMPurify.sanitize(input);
}

// Function to check for duplicate email, phone, or username
function checkForDuplicates(email, phone, username) {
  const csvData = localStorage.getItem('profiles');
  if (csvData) {
    const profiles = JSON.parse(csvData);
    for (const profile of profiles) {
      if (profile.email === email || profile.phone === phone || profile.username === username) {
        return true;
      }
    }
  }
  return false;
}

// Function to generate a new account ID
function generateAccountId() {
  const idArray = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(idArray).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Function to write the new user data to storage and set cookies
function writeDataToStorage(accountId, loginId, hashedPassword, email, phone, username, name, contentGuidelines) {
  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');

  // Add the new user profile with default account_type set to 'member'
  const newUser = {
    accountId,
    loginId,
    hashedPassword,
    email,
    phone,
    username,
    name,
    contentGuidelines,
    account_type: 'member', // Default account type
  };

  profiles.push(newUser);
  localStorage.setItem('profiles', JSON.stringify(profiles));

  // Set cookies with the user data
  setCookie('accountId', accountId, 7);
  setCookie('loginId', loginId, 7);
  setCookie('email', email, 7);
  setCookie('username', username, 7);
  setCookie('name', name, 7);
  setCookie('account_type', newUser.account_type, 7); // Set the account type cookie

  return true;
}

// Main function to handle signup
async function handleSubmit(event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target);

    const loginId = validateInput(formData.get('Login ID'));
    const password = validateInput(formData.get('Password'));
    const email = validateInput(formData.get('Email'));
    const phone = validateInput(formData.get('Phone'));
    const username = validateInput(formData.get('Username'));
    const name = validateInput(formData.get('Name'));
    const contentGuidelines = validateInput(formData.get('ContentGuidelines'));

    if (!formData.get('ToS Agreement')) {
      console.error('You must agree to the Terms of Service.');
      return;
    }

    // Generate a unique account ID
    const accountId = crypto.randomUUID();

    // Create the user object
    const userData = {
      id: accountId,
      login_id: loginId,
      password, // In production, hash the password before storing it
      email,
      phone,
      username,
      name,
      content_guidelines: contentGuidelines,
      created_unix_time: Math.floor(Date.now() / 1000), // Current timestamp
      last_login_unix_time: null,
      total_logins: 0,
      status: 'active',
      account_type: 'member',
      punishment: 'none',
      profile_picture: '',
      banner: '',
      bio: '',
      following: 0,
      followers: 0,
      projects: 0,
      jobs: 0,
      minecraft_projects: 0,
      discord_projects: 0,
      profile_visitors: 0,
      profiles_visited: 0,
      users_blocked: 0,
    };

    // Send the user data to the server and get the token
    const token = await sendUserDataToServer(userData);

    // Set the token as a cookie
    setCookie('authToken', token, 7);

    // Redirect to the home page
    window.location.href = 'home/';
  } catch (error) {
    console.error('Error during signup:', error.message);
  }
}

// Function to hash the password
async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const passwordKey = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordKey,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 10000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );

  const exportedKey = await crypto.subtle.exportKey('raw', derivedKey);
  return {
    salt: Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join(''),
    hash: Array.from(new Uint8Array(exportedKey)).map(b => b.toString(16).padStart(2, '0')).join(''),
  };
}

// Express.js route to handle signup
app.post('/signup', (req, res) => {
  const { loginId, password, email, phone, username, name } = req.body;
  const userIp = req.ip; // Get the user's IP address

  const usersFilePath = './user.json';
  let users = [];
  if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  }

  // Check for duplicates
  const duplicateUser = users.find(
    (user) => user.email === email || user.phone === phone || user.username === username
  );
  if (duplicateUser) {
    return res.status(409).json({ success: false, message: 'Email, phone, or username already in use.' });
  }

  // Create a new user
  const accountId = generateAccountId();
  const token = generateToken();
  const newUser = {
    id: accountId,
    login_id: loginId,
    password, // In production, hash the password before storing it
    email,
    phone,
    username,
    name,
    created_at: new Date().toISOString(),
    token: {
      [userIp]: token // Map the IP address to the token
    }
  };

  users.push(newUser);

  // Write the updated users array back to the JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  // Set the token as a cookie
  res.cookie('authToken', token, { httpOnly: true });
  res.status(201).json({ success: true, token });
});
