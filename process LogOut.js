app.post('/logout', (req, res) => {
  const { token } = req.body;
  const userIp = req.ip; // Get the user's IP address

  const usersFilePath = './user.json';
  let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

  // Find the user with the token and remove the token for the IP address
  users = users.map((user) => {
    if (user.token && user.token[userIp] === token) {
      delete user.token[userIp]; // Remove the token for the IP address
    }
    return user;
  });

  // Write the updated users array back to the JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  // Clear the cookie
  res.clearCookie('authToken');
  res.status(200).json({ success: true });
});