
$(document).ready(function() {
    const $form = $('#form');
    const $submitBtn = $('#submit');
    const $status = $('#status');

    // Input event listeners for the Full Name field
    $('#fullName').on('input', function() {
        validateFullName();
        validateForm();
    });

     // Input event listeners for the Email field
    $('#email').on('input', function() {
        validateFullName();
        validateEmail();
        validateForm();
    });


    // Input event listeners for the Confirm Password field
    $('#confirmPassword').on('input', function() {
        validateConfirmPassword();
        validateForm();
    });

    // Input event listeners for the Password field
    $('#password').on('input', function() {
        validateFullName();
        validateEmail();
        validatePassword();
        validateForm();
        const password = $(this).val();
        const strength = calculatePasswordStrength(password);
        const strengthText = ['Weak', 'Medium', 'Strong'][strength];
        $('#passwordStrength').text(strengthText).removeClass().addClass(`valid strength-${strength}`);
    });

    // Form submission
    $('#submit').on('click', function(e) {
        e.preventDefault();
        $submitBtn.prop('disabled', true);
        $status.empty();
        // Simulate AJAX submission (replace with actual AJAX call)
        setTimeout(function() {
        $('#passwordStrength').text('');
        var submitBtn = $('#submit');
        $status.text('Form submitted successfully!').addClass('valid');
        $form[0].reset();
        submitBtn.prop('disabled', true);
        
            // Remove success message after 3 seconds (adjust time as needed)
            setTimeout(function() {
                $status.empty().removeClass('valid');
            }, 3000); 

        }, 1000);
    });

    function calculatePasswordStrength(password) {
        // Implement your password strength logic here
        // Return 0 for weak, 1 for medium, and 2 for strong
        // For demonstration purposes, we'll use a simple logic based on length
        if (password.length >= 8) {
        return 2; // Strong
        } else if (password.length >= 6) {
        return 1; // Medium
        } else {
        return 0; // Weak
        }
    }

    // Validate the Full Name input field
    function validateFullName() {
        const fullName = $('#fullName').val();
        const isValid = /^[A-Za-z\s]+$/.test(fullName); // Only letters and spaces allowed
        const $errorSpan = $('#fullNameError');
        if (!fullName) {
            $errorSpan.text('Full Name is required');
        } else if (!isValid) {
            $errorSpan.text('Full Name should contain only letters and spaces');
        } else {
            $errorSpan.text('');
        }
    }

    // Validate the Email input field
    function validateEmail() {
        const email = $('#email').val();
        const $errorSpan = $('#emailError');
        $errorSpan.text(isValidEmail(email) ? '' : 'Invalid Email');
    }

    // Validate the Password input field
    function validatePassword() {
        const password = $('#password').val();
        const $errorSpan = $('#passwordError');
        $errorSpan.text(password.length >= 6 ? '' : 'Password must be at least 6 characters');
    }

    // Validate the Confirm Password input field
    function validateConfirmPassword() {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const $errorSpan = $('#confirmPasswordError');
        $errorSpan.text(confirmPassword === password ? '' : 'Passwords do not match');
    }

    // Validate the form buttom
    function validateForm() {
        let isFullNameValid = $('#fullNameError').text() === '';
        let isEmailValid = $('#emailError').text() === '';
        let isPasswordValid = $('#passwordError').text() === '';
        let isConfirmPasswordValid = $('#confirmPasswordError').text() === '';

        let FullName = $('#fullName').val() != '';
        let Email = $('#email').val() != '';
        let Password = $('#password').val() != '';
        let ConfirmPassword = $('#confirmPassword').val() != '';
        $submitBtn.prop('disabled', !(isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && FullName && Email && Password && ConfirmPassword));
    }

    // Function to check if an email is valid
    function isValidEmail(email) {
        // Implement your email validation logic here
        // For demonstration purposes, we'll use a simple regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});