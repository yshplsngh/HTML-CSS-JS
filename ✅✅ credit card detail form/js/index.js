const numberInput = document.getElementById('number');
const numberDisplay = document.getElementById('number-display');

const nameInput = document.getElementById('name');
const nameDisplay = document.getElementById('name-display');

const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const monthDisplay = document.getElementById('month-display');
const yearDisplay = document.getElementById('year-display');

const cvcInput = document.getElementById('cvc');
const cvcDisplay = document.getElementById('cvc-display');

const form = document.getElementById('form');

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = Number(date.getFullYear().toString().slice(-2));

// Due to extra regex replacement for credit card number formatting, a seperate function is written
numberInput.addEventListener('input', function () {
    // Remove any existing error
    document.getElementById('error__number').style.display = "none";
    numberInput.classList.remove('invalid');

    const inputValue = numberInput.value;
    const sanitizedValue = inputValue.replace(/\s/g, '');
    const formattedValue = formatCreditCardNumber(sanitizedValue);
    numberInput.value = formattedValue;

    // Update the value in the div element
    if (numberInput.value.length == 0) {
        numberDisplay.textContent = "0000 0000 0000 0000";
    } else {
        numberDisplay.textContent = numberInput.value;
    }
});


numberInput.addEventListener('keydown', function (event) {
    // Skips any spaces when deleting digits using backspace
    if (event.key === 'Backspace') {
        const inputValue = numberInput.value;
        const cursorPosition = numberInput.selectionStart;

        if (inputValue[cursorPosition - 1] === ' ') {
            event.preventDefault();
            const sanitizedValue = inputValue.replace(/\s/g, '');
            const newCursorPosition = cursorPosition - 1;
            const formattedValue = formatCreditCardNumber(sanitizedValue);
            numberInput.value = formattedValue;
            numberInput.setSelectionRange(newCursorPosition, newCursorPosition);
        }
    }
});

// Name input requires different functionality to check for different characters
nameInput.addEventListener('input', function () {
    // Remove any existing error
    document.getElementById('error__name').style.display = "none";
    nameInput.classList.remove('invalid');

    // Regex to replace any characters which aren't allowed in names
    let value = nameInput.value.replace(/[^[a-zA-Z\s-'.]/g, '');

    // Insert a space every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    nameInput.value = value;

    // Update the value in the div element
    if (nameInput.value.length == 0) {
        nameDisplay.textContent = "Jane Appleseed";
    } else {
        nameDisplay.textContent = nameInput.value;
    }
});

numericDisplayInput(monthInput, monthDisplay, "00", "error__date");
numericDisplayInput(yearInput, yearDisplay, "00", "error__date");
numericDisplayInput(cvcInput, cvcDisplay, "000", "error__cvc");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
})

function formatCreditCardNumber(value) {
    // Adds spaces every 4 digits to format credit card number
    const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue.trim();
}

// Function which displays numeric input content elsewhere when input is changed
// HTML uses input type 'text' for maxlength to be used, therefore numeric checking is done in JS
function numericDisplayInput(inputElement, displayElement, emptyContent, errorElement) {
    inputElement.addEventListener('input', function () {

        // Remove any existing error
        document.getElementById(errorElement).style.display = "none";
        inputElement.classList.remove('invalid');

        // Remove any spaces or non numeric characters input by the user
        let value = inputElement.value.replace(/[^0-9\s]/g, '');
        inputElement.value = value;

        // Update the value in the div element
        if (inputElement.value.length == 0) {
            displayElement.textContent = emptyContent;
        } else {
            displayElement.textContent = inputElement.value;
        }
    });
}

function validateForm() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = Number(date.getFullYear().toString().slice(-2));

    // Declare conditions for validation
    const nameInvalid = nameInput.value === "";
    const numberInvalid = numberInput.value.length < 19;
    const monthInvalid = ((monthInput.value.length < 2) || (month.value > 12));
    const yearInvalid = yearInput.value.length < 2;
    const expired = (yearInput.value < currentYear) || ((yearInput.value === currentYear) && (monthInput.value < currentMonth));
    const cvcInvalid = cvcInput.value.length < 3;

    if (nameInvalid) {
        document.getElementById('error__name').style.display = "inline";
        nameInput.classList.add("invalid");
    }

    if (numberInvalid){
        document.getElementById('error__number').style.display = "inline";
        numberInput.classList.add("invalid");
    }

    if (expired) {
        document.getElementById('error__date').style.display = "inline";
        document.getElementById('error__date').textContent = "Card has expired"
        monthInput.classList.add("invalid");
        yearInput.classList.add("invalid");
    }

    if (monthInvalid) {
        document.getElementById('error__date').style.display = "inline";
        document.getElementById('error__date').textContent = "Please enter a valid date";
        monthInput.classList.add("invalid");
    }

    if (yearInvalid) {
        document.getElementById('error__date').style.display = "inline";
        document.getElementById('error__date').textContent = "Please enter a valid date";
        yearInput.classList.add("invalid");
    }

    if (cvcInvalid) {
        document.getElementById('error__cvc').style.display = "inline";
        cvcInput.classList.add("invalid");
    }

    // If all the validation conditions have passed, hide the form and show completion page
    if (nameInvalid || numberInvalid || monthInvalid || yearInvalid || expired || cvcInvalid) {
        return false
    } else {
        document.getElementById('form').style.display = "none";
        document.getElementById('completed').style.display = "inline";
        return true
    }
}