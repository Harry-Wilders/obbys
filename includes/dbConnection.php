<?php
  $dbHost     = "localhost"; 
  $dbUsername = "root"; 
  $dbPassword = ""; 
  $dbName     = "obby_ventures"; 

// Establish database connection.
$conn = new mysqli($dbHost, $dbUsername,$dbPassword, $dbName); 
            
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
 }

 