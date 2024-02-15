$("#contactForm").submit(function (event) {
  event.preventDefault();

  const formData = new FormData(this);

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
  }).done(function (data) {
    console.log(data);

    if (!data.success) {
      // Check for the correct field names in the error response
      if (data.errors.client_name) {
        $("#name-group").addClass("has-error");
        $("#name-group").append(
          '<div class="help-block">' + data.errors.client_name + "</div>"
        );
      }

      if (data.errors.email) {
        $("#email-group").addClass("has-error");
        $("#email-group").append(
          '<div class="help-block">' + data.errors.email + "</div>"
        );
      }

      if (data.errors.phone_number) {
        $("#phone-number-group").addClass("has-error");
        $("#phone-number-group").append(
          '<div class="help-block">' + data.errors.phone_number + "</div>"
        );
      }

      if (data.errors.info) {
        $("#info-group").addClass("has-error");
        $("#info-group").append(
          '<div class="help-block">' + data.errors.info + "</div>"
        );
      }
    } else {
      $("#response").html(
        '<div class="alert alert-success">' + data.message + "</div>"
      );
      $("#contactForm").trigger("reset");
    }
  });
});
