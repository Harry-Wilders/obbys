document.addEventListener("DOMContentLoaded", function () {
  const phoneInputField = document.querySelector("#phoneID");
  const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
  const info = document.querySelector(".alert-info");
  function process() {
    const phoneNumber = phoneInput.getNumber();

    info.style.display = "";
    info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;

    return phoneNumber;
  }

  // Attach the event listener to the form
  $("#contact_form1").submit(function (event) {
    event.preventDefault();

    validate_form();
    process();

    function validate_form() {
      // Prevent the form from submitting initially
      console.log("Validating form...");

      clearErrors();

      // Get the form and form elements
      var clientName = document.getElementById("clientName").value.trim();
      var designation = document.getElementById("designationID").value.trim();
      var orgname = document.getElementById("orgName").value.trim();
      var country = document.getElementById("countryID").value;
      var email = document.getElementById("emailid").value.trim();
      var phone_input = document.querySelector("#phoneID");
      var form = document.getElementById("contact_form1");
      const formData = new FormData($("#contact_form1")[0]);
      console.log("Form data:", {
        clientName,
        designation,
        orgname,
        country,
        email,
        phone_input,
        form,
      });

      var status = getRadioValue(form.elements["status"]);
      var events = form.elements["event[]"];
      var technical = form.elements["technical[]"];
      var others = form.elements["others[]"];
      var comment = document.getElementById("commentsID").value.trim();
      var agree = form.elements["agree"].checked;

      console.log("Additional form data:", {
        status,
        events,
        technical,
        others,
        comment,
        agree,
      });

      // Initialize an array to store validation errors
      var errors = [];

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

      // Get the internationalized phone number
      const phoneNumber = phoneInput.getNumber();
      console.log("International Phone Number:", phoneNumber);

      // Replace the original phone_number field with the internationalized phone number
      formData.set("phone_number", phoneNumber);
      if (phone_input.value === "") {
        errors.push("Enter phone number");
        markError("phoneID");
      } else {
        // Validate that a country code is selected
        const selectedCountryData = phoneInput.getSelectedCountryData();
        if (
          !selectedCountryData ||
          Object.keys(selectedCountryData).length === 0
        ) {
          errors.push("Please select a valid country code.");
          markError("phoneID");
        }
      }

      console.log("Validation errors:", errors);

      // Check if at least one checkbox is checked in each category
      if (
        $("input[name='technical[]']:checked").length === 0 &&
        $("input[name='event[]']:checked").length === 0 &&
        $("input[name='others[]']:checked").length === 0
      ) {
        errors.push(
          "Please select at least one option in Technical, Events, or Others."
        );

        if ($("input[name='technical[]']:checked").length === 0) {
          markError("technical");
        } else if ($("input[name='event[]']:checked").length === 0) {
          markError("event");
        } else {
          markError("others");
        }
      }

      console.log("After checkbox validation, errors:", errors);

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
        markError("influencerRadio");
        markError("decisionRadio");
      }

      console.log("After radio button validation, errors:", errors);

      if (comment === "") {
        errors.push("Please Tell us more about your request (Tell Us More).");
        markError("commentsID");
      }

      if ($("input[name='privacy']:checked").length === 0) {
        errors.push("Please accept the terms and conditions");
        markError("privacyCheckbox");
      }

      // Display errors if any
      if (errors.length > 0) {
        displayErrors(errors);
        console.log("Form validation failed.");
      } else {
        // If no errors, submit the form

        submitForm(formData);
        console.log("Form submitted successfully.", formData);
      }
    }

    function submitForm(formData) {
      $.ajax({
        url: "quote_process.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json", // Expecting JSON response
        success: function (response) {
          console.log("Success Response from server:", response);
          if (response.success) {
            $("#error-container").html(
              "<div class='alert alert-success'>" + response.message + "</div>"
            );

            $("#contact_form1").trigger("reset");
          } else {
            let errors = "<ul>";
            for (const [key, value] of Object.entries(response.errors)) {
              errors += "<li>" + value + "</li>";
            }
            errors += "</ul>";
            $("#error-container").html(
              "<div class='alert alert-danger m-3 p-2'>" + errors + "</div>"
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error:", textStatus, errorThrown);
          // Check if detailed error information is present in the response
          if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
            console.log(
              "Detailed error information:",
              jqXHR.responseJSON.errors
            );
          }
          $("#error-container").html(
            "<div class='alert alert-danger m-3 p-2'>An error occurred. Please try again.</div>" +
              errorThrown
          );
        },
      });
    }

    function displayErrors(errors) {
      // Display error messages on the page
      var errorContainer = document.getElementById("error-container");
      var errorList = document.createElement("ul");

      if (Array.isArray(errors)) {
        // If errors is an array, iterate through it
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
      } else {
        // If errors is an object, assume it contains properties for different error types
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            var listItem = document.createElement("li");
            listItem.style.display = "flex"; // Set display to flex for the li element

            // Add an Ionicon before the error message
            var ionIcon = document.createElement("ion-icon");
            ionIcon.setAttribute("name", "alert-circle-outline"); // Replace with the desired Ionicon name
            ionIcon.style.marginRight = "5px"; // Adjust margin as needed
            listItem.appendChild(ionIcon);

            var errorMessage = document.createTextNode(errors[key]);
            listItem.appendChild(errorMessage);

            // Add padding to the error message
            listItem.style.padding = "5px";

            errorList.appendChild(listItem);
          }
        }
      }

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
});
