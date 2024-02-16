<?php

include('includes/dbConnection.php');

$errors = '';
if (isset($_POST['submit'])) {

    // Sanitize and capitalize the client_name input.
    $client_name = trim($_REQUEST["client_name"]);
    $client_name = ucwords($client_name);

    // Perform email validation
    $email = trim($_REQUEST["email"]);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors .= "Invalid email format. ";
    }

    // Assuming you have similar processing for other form fields like phone_number and info.
    $phone_number = trim($_REQUEST["phone_number"]);
    $info = trim($_REQUEST["info"]);

    // Check if there are no validation errors
    if (empty($errors)) {

        // Prepare and execute the SQL query
        $sql = "INSERT INTO client_contact (client_name, email, phone_number, info) VALUES (?, ?, ?, ?)";

        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $client_name, $email, $phone_number, $info);

        if ($stmt->execute()) {
            // Insert successful
            echo "Data inserted successfully!";
        } else {
            // Insert failed
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        // Display errors in HTML
        echo "<script>document.getElementById('error-section').innerHTML = '<p style=\"color: red;\">$errors</p>';</script>";
    }
}

?>