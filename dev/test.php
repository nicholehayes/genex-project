<?php
$servername = "http://continentalgenetics.ddns.net:5000";
$username = "root";
$password = "database3";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>