// variables

const inputName = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJob = document.getElementById('other-job-role');
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOptions = color.children; 
const activities = document.getElementById('activities');
const checkBox = document.querySelectorAll('input[type=checkbox]');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;
const payMethod = document.getElementById('payment');
const creditDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const email = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');


// focuses on input name field
inputName.focus();

// hide other job role box by default
otherJob.style.display = 'none';

// show other job role if 'other' is selected
jobRole.addEventListener('change', (e) => {
    let selectOther = e.target.value;
    if (selectOther === 'other') {
        otherJob.style.display = '';
    } else {
        otherJob.style.display = 'none';
    }
});

// shirt color and design selection
color.disabled = true;

design.addEventListener('change', (e) => {
    color.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const designSelect = e.target.value;
        const shirtTheme = colorOptions[i].getAttribute('data-theme');

        if (designSelect === shirtTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].setAttribute('selected', false);
        }
    }
});

// register for activities

activities.addEventListener('change', (e) => {
    let dataCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

// payment section 

paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

payMethod.children[1].setAttribute('selected', true);

payMethod.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        paypalDiv.style.display = '';
        creditDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        paypalDiv.style.display = 'none';
        creditDiv.style.display = 'none';
        bitcoinDiv.style.display = '';
    } else {
        paypalDiv.style.display = 'none';
        creditDiv.style.display = '';
        bitcoinDiv.style.display = 'none';
    }
});

// form validation helper functions

function validName() {
    if (inputName.value === '') {
        inputName.classList.add('error');
        inputName.parentElement.classList.remove('valid');
        inputName.parentElement.classList.add('not-valid');
        inputName.parentElement.lastElementChild.style.display = 'block';
        return false;
    }
        inputName.classList.remove('error');
        inputName.parentElement.classList.remove('not-valid');
        inputName.parentElement.classList.add('valid');
        inputName.parentElement.lastElementChild.style.display = 'none';
        return true;
}

function validEmail() {
    const emailValue = email.value;
    const emailTest = /^((?:(?:(?:[a-zA-Z0-9][\.\-\+_]?)*)[a-zA-Z0-9])+)\@((?:(?:(?:[a-zA-Z0-9][\.\-_]?){0,62})[a-zA-Z0-9])+)\.([a-zA-Z0-9]{2,6})$/;
    const testEmail = emailTest.test(emailValue);
    if (testEmail) {
        email.classList.remove('error');
        email.parentElement.classList.remove('not-valid');
        email.parentElement.classList.add('valid');
        email.parentElement.lastElementChild.style.disabled - 'none';
        return true;
    }
        email.classList.add('error');
        email.parentElement.classList.remove('valid');
        email.parentElement.classList.add('not-valid');
        email.parentElement.lastElementChild.style.display = 'block';
        return false;
}

function validActivities() {
    let arr = [];
    for (let i = 0; i < checkBox.length; i++) {
        arr += checkBox[i].checked;
    }
    if (arr.includes(true)) {
        activities.classList.remove('not-valid');
        activities.classList.add('valid');
        activities.lastElementChild.style.display = 'none';
        return true;
    }
    activities.classList.add('not-valid');
    activities.classList.remove('valid');
    activities.lastElementChild.style.display = 'block';
    return false;
}

function validCC() {
    let arr = [];
    const cardValue = cardNum.value;
    const cardTest = /^[0-9]{13,16}$/;
    arr += cardTest.test(cardValue);
    const zipValue = zipCode.value;
    const zipTest = /^[0-9]{5}$/;
    arr += zipTest.test(zipValue);
    const cvvValue = cvv.value;
    const cvvTest = /^[0-9]{3}$/;
    arr += cvvTest.test(cvvValue);
    if (payMethod.value === 'credit-card' || payMethod.value === 'select-method') {
        if (cardNum.value.length > 16 ) {
            cardNum.parentElement.lastElementChild.innerHTML = 'Card number must be less than 16 digits';
        }
        if (!cardTest.test(cardValue)) {
            cardNum.parentElement.classList.add('not-valid');
            cardNum.parentElement.classList.remove('valid');
            cardNum.parentElement.lastElementChild.style.display = 'block';
            cardNum.classList.add('error');
        } else {
            cardNum.parentElement.classList.add('valid');
            cardNum.parentElement.classList.remove('not-valid');
            cardNum.parentElement.lastElementChild.style.display = 'none';
            cardNum.classList.remove('error');
        }
        if (zipCode.value.length > 5 ) {
            zipCode.parentElement.lastElementChild.innerHTML = 'Zip Code must be less than 6 digits';
        }
        if (!zipTest.test(zipValue)) {
            zipCode.parentElement.classList.add('not-valid');
            zipCode.parentElement.classList.remove('valid');
            zipCode.parentElement.lastElementChild.style.display = 'block';
            zipCode.classList.add('error');
        } else {
            zipCode.parentElement.classList.add('valid');
            zipCode.parentElement.classList.remove('not-valid');
            zipCode.parentElement.lastElementChild.style.display = 'none';
            zipCode.classList.remove('error');
        }
        if (cvv.value.length > 3 ) {
            cvv.parentElement.lastElementChild.innerHTML = 'CVV must be less than 4 digits';
        }
        if (!cvvTest.test(cvvValue)) {
            cvv.parentElement.classList.add('not-valid');
            cvv.parentElement.classList.remove('valid');
            cvv.parentElement.lastElementChild.style.display = 'block';
            cvv.classList.add('error');
        } else {
            cvv.parentElement.classList.add('valid');
            cvv.parentElement.classList.remove('not-valid');
            cvv.parentElement.lastElementChild.style.display = 'none';
            cvv.classList.remove('error');
        }
        if (arr.includes(false)) {
            return false;
        }
    }
    return true;
}

// form listener

form.addEventListener('submit', (e) => {
    let arr = [];
    arr += validName();
    arr += validEmail();
    arr += validActivities();
    arr += validCC();
    if (arr.includes(false)) {
        e.preventDefault();
    }
});

// real time validation
cardNum.addEventListener('keyup', validCC);
zipCode.addEventListener('keyup', validCC);
cvv.addEventListener('keyup', validCC);

// accessibility focus and blur

for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener('focus', (e) => {
        checkBox[i].parentElement.classList.add('focus');
    });
    checkBox[i].addEventListener('blur', (e) => {
        checkBox[i].parentElement.classList.remove('focus');
    });
}

// only one activity selection at at time

activities.addEventListener('change', (e) => {
    const selected = e.target;
    const details = selected.getAttribute('data-day-and-time');
    for (let i = 0; i < checkBox.length; i++) {
        const checkDate = checkBox[i].getAttribute('data-day-and-time');
        if (details === checkDate && selected !== checkBox[i]) {
            if (selected.checked) {
                checkBox[i].disabled = true;
                checkBox[i].parentElement.classList.add('disabled');
            }
            if (!selected.checked) {
                checkBox[i].disabled = false;
                checkBox[i].parentElement.classList.remove('disabled');
            }
        }
    }
});