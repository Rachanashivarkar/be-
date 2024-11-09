<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "rach123"; // Replace with your MySQL root password if it exists
$dbname = "contact_page"; // Replace with your actual database name

// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement to prevent SQL injection
$sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $message);

// Execute the statement and check if it was successful
if ($stmt->execute()) {
    echo "<script>alert('Your message has been sent successfully!'); window.location.href = './contact.html';</script>";
} else {
    echo "<script>alert('There was an error submitting your message. Please try again later.'); window.location.href = './contact.html';</script>";
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
