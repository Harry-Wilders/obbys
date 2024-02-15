$(function () {
  $("#contact_form1").submit(function (event) {
    // Prevent the form from submitting initially
    if (event) {
      event.preventDefault();
    }
    clearErrors();
    // Get the form and form elements
    var clientName = document.getElementById("clientName").value.trim();
    var designation = document.getElementById("designationID").value.trim();
    var orgname = document.getElementById("orgName").value.trim();
    var country = document.getElementById("countryID").value;
    var email = document.getElementById("emailid").value.trim();
    var phone_input = document.getElementById("phoneID");
    var form = document.getElementById("contact_form1"); // Ensure you have a form with the ID "contact_form1"
    var status = getRadioValue(form.elements["status"]);
    var events = form.elements["event[]"];
    var technical = form.elements["technical[]"];
    var others = form.elements["others[]"];
    var comment = document.getElementById("comments").value.trim();
    var agree = form.elements["agree"].checked; // Ensure agreement is checked

    // Initialize an array to store validation errors
    var errors = [];

    // Additional validations:

    // Example validation: Check if client name, email, phone, status, agreement, and privacy are not empty
    if (clientName === "") {
      errors.push("Please enter your name.");
      markError("clientName");
    }
    if (orgname === "") {
      errors.push("Please enter your organisation name.");
      markError("orgName");
    }

    if (country === "") {
      errors.push("Please select your country.");
      markError("countryID");
    }

    if (email === "") {
      errors.push("Please enter your email address.");
      markError("emailid");
    }
    function validatePhoneNumber(input_str) {
      var re = "/^+[0-9]{1,3}s*[-.(]?d{3}[-.(]?d{3}[-.(]?d{4,}$/";

      return re.test(input_str);
    }
    if (phone_input.value === "") {
      errors.push("Enter phone number");
      markError("phoneID");
    } else if (!validatePhoneNumber(phone_input)) {
      errors.push("Enter phone number correctly");
      markError("phoneID");
    }

    // Check if at least one checkbox is checked in each category
    if (
      $("input[name='technical[]']:checked").length === 0 &&
      $("input[name='events[]']:checked").length === 0 &&
      $("input[name='others[]']:checked").length === 0
    ) {
      errors.push(
        "Please select at least one option in Technical, Events, or Others."
      );
      markError("technical"); // You may want to add separate IDs for technical, events, and others divs
    }

    if (
      !(
        $("#buyerRadio").is(":checked") ||
        $("#influencerRadio").is(":checked") ||
        $("#decisionRadio").is(":checked")
      )
    ) {
      errors.push(
        "Please indicate status quo (Buyer, Influencer, or Decision Maker)"
      );
      markError("buyerRadio");
    }
    if (comment === "") {
      errors.push("Please Tell us more about your request (Tell Us More).");
      markError("comments");
    }

    if ($("input[name='privacy']:checked").length === 0) {
      errors.push("Please accept the terms and conditions");
      markError("privacyCheckbox");
    }

    // Display errors if any
    if (errors.length > 0) {
      displayErrors(errors);
    } else {
      // If no errors, submit the form
      form.submit();
      console.log("Success");
    }
  });

  function displayErrors(errors) {
    // Display error messages on the page
    var errorContainer = document.getElementById("error-container");
    var errorList = document.createElement("ul");

    errors.forEach(function (error) {
      var listItem = document.createElement("li");
      listItem.style.display = "flex"; // Set display to flex for the li element

      // Add an Ionicon before the error message
      var ionIcon = document.createElement("ion-icon");
      ionIcon.setAttribute("name", "alert-circle-outline"); // Replace with the desired Ionicon name
      ionIcon.style.marginRight = "5px"; // Adjust margin as needed
      listItem.appendChild(ionIcon);

      var errorMessage = document.createTextNode(error);
      listItem.appendChild(errorMessage);

      // Add padding to the error message
      listItem.style.padding = "5px";

      errorList.appendChild(listItem);
    });
    errorContainer.style.padding = "20px";

    errorContainer.innerHTML = "";
    errorContainer.appendChild(errorList);
  }

  function markError(elementId) {
    // Mark the input field with an error class
    var inputElement = document.getElementById(elementId);
    inputElement.classList.add("error");
  }

  function clearErrors() {
    // Clear previous errors and remove error class
    var errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "";

    var errorFields = document.querySelectorAll(".error");
    errorFields.forEach(function (field) {
      field.classList.remove("error");
    });
  }

  function getRadioValue(radioGroup) {
    for (var i = 0; i < radioGroup.length; i++) {
      if (radioGroup[i].checked) {
        return radioGroup[i].value;
      }
    }
    return null;
  }
});
