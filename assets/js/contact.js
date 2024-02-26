document.addEventListener("DOMContentLoaded", function () {
  const phoneInputField = document.querySelector("#phoneNumber");
  const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  $("#contactForm").submit(function (event) {
    event.preventDefault();
    process();
  });

  function process() {
    const phoneNumber = phoneInput.getNumber();

    // Remove starting zero if necessary
    let formattedPhoneNumber = phoneNumber.replace(/^0+/, "");

    // Validate phone number with int-tel-input methods
    const isValid = phoneInput.isValidNumber();
    if (!isValid) {
      $("#phoneNumber-group").addClass("has-error");
      $("#response").html(
        '<div class="alert alert-danger">Please enter a valid phone number with country code.</div>'
      );
      return false; // Stop form submission
    } else {
      // Replace the original phone_number field with the formatted phone number
      const formData = new FormData($("#contactForm")[0]);
      formData.set("phone_number", formattedPhoneNumber);
      submitForm(formData);
    }
  }

  function submitForm(formData) {
    $.ajax({
      url: "contact_process.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (response.success) {
          $("#response").html(
            "<div class='alert alert-success'>" + response.message + "</div>"
          );
          $("#contactForm").trigger("reset");
        } else {
          let errors = "<ul>";
          for (const [key, value] of Object.entries(response.errors)) {
            errors += "<li>" + value + "</li>";
          }
          errors += "</ul>";
          $("#response").html(
            "<div class='alert alert-danger'>" + errors + "</div>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#response").html(
          "<div class='alert alert-danger'>An error occurred: " +
            errorThrown +
            "</div>"
        );
      },
    });
  }
});
