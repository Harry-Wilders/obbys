<?php
// Include database connection
include('includes/dbConnection.php');

// Initialize response data
$data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form data using validated inputs

    $errors = []; // Initialize an empty array for validation errors

    if (empty($_POST['client_name'])) {
        $errors['client_name'] = 'Name is required.';
    }
    if (empty($_POST['email'])) {
        $errors['email'] = 'Email is required.';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format.';
    } 
    if (empty($_POST['phone_number'])) {
        $errors['phone_number'] = 'Phone Number is required.';
    } else {
        $phone_number_pattern = "/^\+[0-9]{1,3}\s*[-\.\(]?\d{3}[-\.\(]?\d{3}[-\.\(]?\d{4,}$/";
        $sanitized_phone_number = mysqli_real_escape_string($conn, $_POST['phone_number']);
        if (!preg_match($phone_number_pattern, $sanitized_phone_number)) {
            // Invalid phone number
            $errors['phone_number'] = 'Invalid phone number format.';
        }
    }
    if (empty($_POST['info'])) {
        $errors['info'] = 'Please provide details.';
    }

    if (empty($errors)) {
        // Sanitize and validate inputs according to data types and security considerations
        $sanitized_client_name = mysqli_real_escape_string($conn, $_POST['client_name']);
        $sanitized_email = mysqli_real_escape_string($conn, $_POST['email']);
        $sanitized_phone_number = mysqli_real_escape_string($conn, $sanitized_phone_number);
        $sanitized_info = mysqli_real_escape_string($conn, $_POST['info']);

        // Prepare and execute SQL query using prepared statements
        $sql = "INSERT INTO client_contact (client_name, email, phone_number, info) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $sanitized_client_name, $sanitized_email, $sanitized_phone_number, $sanitized_info);

        if ($stmt->execute()) {
            // Insert successful
            $data['success'] = true;
            $data['message'] = 'Message received. Thanks for your interest; we shall contact you shortly!';
        } else {
            // Insert failed
            $data['success'] = false;
            $data['message'] = 'Error: ' . $stmt->error;
        }

        $stmt->close();
    } else {
        $data['success'] = false;
        $data['errors'] = $errors;
    }
    echo json_encode($data);
} else {
    // Handle errors or invalid requests
}

// Close database connection after use
$conn->close();
?>