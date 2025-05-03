// Get the CSV file
fetch('profiles.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data
    const csvRows = csvData.split('\n');
    const userData = csvRows.map(row => {
      const columns = row.split(',');
      return {
        id: columns[0],
        account_id: columns[1],
        login_id: columns[2],
        password: columns[3],
        email: columns[4],
        phone: columns[5],
        username: columns[6],
        name: columns[7],
        last_login_unix_time: columns[8],
        created_unix_time: columns[9],
        total_logins: columns[10],
        discord_id: columns[11],
        status: columns[12],
        account_type: columns[13],
        punishment: columns[14],
        content_guidelines: columns[15],
        profile_picture: columns[16],
        banner: columns[17],
        bio: columns[18],
        following: columns[19],
        followers: columns[20],
        projects: columns[21],
        jobs: columns[22],
        minecraft_projects: columns[23],
        discord_projects: columns[24],
        profile_visitors: columns[25],
        profiles_visited: columns[26],
        users_blocked: columns[27]
      };
    });

    // Log the entire user data array
    console.log(userData);

    // You can also access individual columns like this:
    console.log(userData.map(user => user.username)); // Array of usernames
    console.log(userData.map(user => user.profile_picture)); // Array of profile pictures
    // ...
  });