<?php
// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form data
  $login_id = $_POST["Login ID"];
  $password = $_POST["Password"];
  $email = $_POST["Email"];
  $phone = $_POST["Phone"];
  $username = $_POST["Username"];
  $name = $_POST["Name"];
  $content_guidelines = $_POST["ContentGuidelines"];
  $birthday = $_POST["Birthday"];
  $tos_agreement = $_POST["ToS Agreement"POST]
  // Hash the password using password_hash()
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Read the CSV file
  $fp = fopen("profiles.csv", "r");
  $csvData = array();
  while (($row = fgetcsv($fp, 1000, ","))!== FALSE) {
    $csvData[] = $row;
  }
  fclose($fp);

  // Check for duplicate email, phone, or username
  $duplicateFound = false;
  foreach ($csvData as $row) {
    if ($row[4] == $email || $row[5] == $phone || $row[6] == $username) {
      $duplicateFound = true;
      break;
    }
  }

  if ($duplicateFound) {
    // Display an error message
    echo "Error: Email, phone, or username is in use.";
  } else {
    // Generate a new account ID
    do {
      $accountId = rand(100000000000000000, 999999999999999999); // 17-18 digits
      $duplicateAccountIdFound = false;
      foreach ($csvData as $row) {
        if ($row[1] == $accountId) {
          $duplicateAccountIdFound = true;
          break;
        }
      }
    } while ($duplicateAccountIdFound);

    // Write the new user data to the CSV file
    $fp = fopen("profiles.csv", "a");
    fputcsv($fp, array("", $accountId, $login_id, $hashed_password, $email, $phone, $username, $name, "", "", "", "", "", "", $content_guidelines, "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
    fclose($fp);

    // Redirect to a success page or display a success message
    header("Location: home/index.html");
    exit;
  }
}
?>