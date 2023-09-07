class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate'
        ]
    }

    // Start validation of all fields
    validate(form) {
        // Clear all old validations
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        // Grab all inputs
        let inputs = form.getElementsByTagName('input');

        // Transform HTMLCollection in array
        let inputsArray = [...inputs];

        // Loop in the inputs and validation through the attributes found
        inputsArray.forEach(function (input, obj) {
            // Validate against the input attribute
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {
                    // Clear string to know the method
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // Input value
                    let value = input.getAttribute(this.validations[i])

                    // Invokes the method
                    this[method](input, value);
                }
            }
        }, this);
    }

    // Method to validate that it has a minimum of characters
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `The field must be at least ${minValue} characters`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    // Method to validate whether it has passed the maximum number of characters
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = `The field must be less than ${maxValue} characters`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    // Method for validating strings that only contain letters
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `This field does not accept numbers or special characters`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    // Method to validate email
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Enter an email in the default example@email.com`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    // Check if one field is the same as the other
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `This field must be equal to ${inputName}`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    // Method to display inputs that are required
    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `This field is required`;

            this.printMessage(input, errorMessage);
        }
    }

    // Validating the password field
    passwordvalidate(input) {
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `The password needs an uppercase character and a number`;

            this.printMessage(input, errorMessage);
        }
    }

    // Method to print error messages
    printMessage(input, msg) {
        // Check the errors present in the input
        let errorsQty = input.parentNode.querySelector('.error-validation');

        // Print error only if you have no errors
        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    // Removes all validations to check again
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// Form submission event where it validates inputs
submit.addEventListener('click', function (e) {
    e.preventDefault();

    validator.validate(form);
});
