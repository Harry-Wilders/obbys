<?php
// Include database connection
include('includes/dbConnection.php');


// Initialize response data
$data = [];

$errors = []; // Initialize an empty array for validation errors

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form data using validated inputs

    $errors = []; // Initialize an empty array for validation errors

    if (empty($_POST['client_name'])) {
        $errors['client_name'] = 'Name is required.';
    }
    if (empty($_POST['designation'])) {
        $errors['designation'] = 'Designation is required.';
    }
    if (empty($_POST['orgname'])) {
        $errors['orgname'] = 'Organization Name is required.';
    }
    if (empty($_POST['country'])) {
        $errors['country'] = 'Country is required.';
    }
    if (empty($_POST['email'])) {
        $errors['email'] = 'Email is required.';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format.';
    } 
    
        // Check phone number format
    if (empty($_POST['phone_number'])) {
        $errors['phone_number'] = 'Phone Number is required.';
    } else {
        $sanitized_phone_number = mysqli_real_escape_string($conn, $_POST['phone_number']);
        $phone_number_pattern = "/^\+[0-9]{1,3}\s*[-\.\(]?\d{3}[-\.\(]?\d{3}[-\.\(]?\d{4,}$/";
        if (!preg_match($phone_number_pattern, $sanitized_phone_number)) {
            // Invalid phone number
            $errors['phone_number'] = 'Invalid phone number format.';
        }
    }
    if (empty($_POST['status'])) {
     
    $errors['status'] = 'Your Status is required.';


    }

    // Checkboxes and textarea validations
    

    if (empty($_POST['comment'])) {
        $errors['comment'] = 'Tell us more is required.';
    }

    // Radio buttons and checkbox validations
    if (empty($_POST['agree']) || ($_POST['agree'] != '1' && $_POST['agree'] != '2')) {
        $errors['agree'] = 'Agree/Disagree is required.';
    }
    if (empty($_POST['privacy']) || $_POST['privacy'] !== 'agreed') {
        $errors['privacy'] = 'Privacy agreement is required.';
    }

    if (empty($errors)) {
       // Sanitize and validate inputs according to data types and security considerations
        $sanitized_client_name = mysqli_real_escape_string($conn, $_POST['client_name']);
        $sanitized_designation = mysqli_real_escape_string($conn, $_POST['designation']);
        $sanitized_orgname = mysqli_real_escape_string($conn, $_POST['orgname']);
        $sanitized_country = mysqli_real_escape_string($conn, $_POST['country']);
        $sanitized_email = mysqli_real_escape_string($conn, $_POST['email']);
        $sanitized_phone_number = mysqli_real_escape_string($conn, $sanitized_phone_number);
        $sanitized_status = mysqli_real_escape_string($conn, $_POST['status']);
        $sanitized_comment = mysqli_real_escape_string($conn, $_POST['comment']);
        $sanitized_agree = mysqli_real_escape_string($conn, $_POST['agree']);
        $sanitized_privacy = mysqli_real_escape_string($conn, $_POST['privacy']);

        // Sanitize optional fields
        $sanitized_event = isset($_POST['event']) ? implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['event']), $conn), $_POST['event'])) : '';
        $sanitized_technical = isset($_POST['technical']) ? implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['technical']), $conn), $_POST['technical'])) : '';
        $sanitized_others = isset($_POST['others']) ? implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['others']), $conn), $_POST['others'])) : '';


        // Prepare and execute SQL query using prepared statements
        $sql = "INSERT INTO client_quote_request (client_name, designation, orgname, country, email, phone_number, client_status, 
                event_interest, technical_interest, others_interest, comment, agree, privacy) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
     
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssssss", $sanitized_client_name, $sanitized_designation, $sanitized_orgname, 
                        $sanitized_country, $sanitized_email, $sanitized_phone_number, $sanitized_status,
                        $sanitized_event, $sanitized_technical, $sanitized_others, $sanitized_comment,
                        $sanitized_agree, $sanitized_privacy);

        if ($stmt->execute()) {
            // Insert successful
            $data['success'] = true;
            $data['message'] = 'Message received. Thanks for your interest; we shall contact you shortly!';
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            // Insert failed
            $data['success'] = false;
            $data['message'] = 'Error: ' . $stmt->error;
            $data['errors'] = $errors; // Include the validation errors array
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }

        $stmt->close();
    }
} else {
    // Handle errors or invalid requests
    $data['success'] = false;
    $data['message'] = 'Invalid request method.';
    header('Content-Type: application/json');
    echo json_encode($data);
}


// Close database connection after use
$conn->close();?>