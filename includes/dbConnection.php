<?php
  $dbHost     = "localhost"; 
  $dbUsername = "root"; 
  $dbPassword = ""; 
  $dbName     = "obby_ventures"; 

// Establish database connection.
$conn = new mysqli($dbHost, $dbUsername,$dbPassword, $dbName); 
            
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
<<<<<<< HEAD
 } 
=======
 }
>>>>>>> 06a37cd1f34640e6d33a49198badb9192eda7f1d

 