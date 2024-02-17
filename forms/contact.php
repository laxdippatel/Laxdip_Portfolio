<?php

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// SQL query to insert data
$sql = "INSERT INTO details (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

// Execute query
if ($conn->query($sql) === TRUE) {
  ?> <script> if (window.confirm('Message Sent Successfully!')) {  window.location.href = 'http://localhost/Laxdip_code/index.php'; } </script> <?php 
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();

?>
