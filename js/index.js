'use strict';

const form = document.querySelector('.form');

const verificationsRegEx = {
    name: /^[A-Za-zА-Яа-яІіЇїЄє\s]{2,}$/,
    message: /^.{5,500}$/, 
    phone: /^\+380\d{9}$/,
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
};

form.addEventListener('submit', event => {
    event.preventDefault(); 

    const inputs = form.querySelectorAll('.form-input');
    let isValid = true;
    const formData = {};

    inputs.forEach(input => {
        const valid = validateField(input);

        if (!valid) {
            isValid = false;
        }

        formData[input.name] = input.value.trim();
    });

    if (isValid) {
        console.log('Form-Data:', formData);
        alert('Дякую! Ваш запит прийнято');

        inputs.forEach(input => {
            input.value = '';
        });
    }
});

form.addEventListener('blur', event => {
    const input = event.target;

    if (input.classList.contains('form-input')) {
        validateField(input);
    }

}, true);

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    const verification = verificationsRegEx[fieldName];

    if (fieldName === 'name' && !verification.test(value)) {
        showError(input, "надто коротке ім'я");
        return false;
    }

    if (fieldName === 'message' && !verification.test(value)) {
        showError(input, 'надто коротке повідомлення');
        return false;
    }

    if (fieldName === 'phone' && !verification.test(value)) {
        showError(input, 'номер повинен мати вигдял: +380... (9 цифр після коду країни)');
        return false;
    }

    if (fieldName === 'email' && !verification.test(value)) {
        showError(input, 'некоректна назва електронної пошти');
        return false;
    }

    removeError(input);
    return true;
}

function showError(input, message) {
    const prevError = input.nextElementSibling;

    if (prevError.classList.contains('error-message')){
        prevError.remove();
    }
    
    const currentError = document.createElement('div');
    currentError.classList.add('error-message');
    currentError.textContent = message;

    input.after(currentError);

    input.classList.add('input-invalid');
}

function removeError(input) {
    const currentError = input.nextElementSibling;
    
    if (currentError.classList.contains('error-message')) {
        currentError.remove();
    }

    input.classList.remove('input-invalid');
}
