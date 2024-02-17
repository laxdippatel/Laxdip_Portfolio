


const formData = new FormData(form);

fetch('contact.php', {
  method: 'POST',
  body: formData
})
.then(response => response.text())
.then(data => {
  result.textContent = data;
  form.reset();
})
.catch(error => {
  console.error('Error:', error);
  result.textContent = 'An error occurred. Please try again.';
});

$(document).ready(function() {
  // Form validation rules
  var form = $('.php-email-form');
  form.validate({
    rules: {
      name: {
        required: true,
        minlength: 4
      },
      email: {
        required: true,
        email: true
      },
      subject: {
        required: true,
        minlength: 8
      },
      message: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Your name must be at least 4 characters long"
      },
      email: "Please enter a valid email address",
      subject: {
        required: "Please enter a subject",
        minlength: "Your subject must be at least 8 characters long"
      },
      message: "Please enter your message"
    },
    // Display error messages below each input
    errorPlacement: function(error, element) {
      error.appendTo(element.parent().next('.validate'));
    },
    // Submit handler
    submitHandler: function(form) {
      // Disable submit button and show loading message
      $('button[type="submit"]').prop('disabled', true);
      $('.loading').show();
      $('.error-message').hide();
      $('.sent-message').hide();

      // Send form data to PHP script using AJAX
      $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serialize(),
        dataType: 'json', // Expect JSON response
        success: function(response) {
          // Handle response
          $('.loading').hide();
          if (response.success) {
            $('.sent-message').text(response.message).show();
            form.trigger('reset'); // Clear form fields
            setTimeout(function() {
              window.location.href = 'http://localhost/Laxdip_code/index.php';
            }, 3000); // Redirect after 3 seconds
          } else {
            $('.error-message').text(response.message).show();
          }
          $('button[type="submit"]').prop('disabled', false);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Handle error
          $('.loading').hide();
          $('.error-message').text('An error occurred. Please try again.').show();
          $('button[type="submit"]').prop('disabled', false);
        }
      });
    }
  });
});
