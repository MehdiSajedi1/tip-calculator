'use strict';

// * ------------------------------------------------------------------------------------------

// SELECTING ELEMENTS

// Form
const formEl = document.querySelector('#form');

// Number input fields
const billEl = document.querySelector('#bill');
const customTipEl = document.querySelector('#custom-tip-input');
const peopleEl = document.querySelector('#people');

// Tip group parent (for event delegation)
const tipEl = document.querySelector('.form__tip__options');

// To remove active class from radio buttons on custom tip input (visually signal the button is no longer selected)
const tipInputs = document.querySelectorAll('.tip-input');

// Reset
const resetBtn = document.querySelector('#reset-btn');

// Used to add/remove show-error class
const billContainer = document.querySelector('#bill-container');
const tipContainer = document.querySelector('#tip-container');
const peopleContainer = document.querySelector('#people-container');

// Calculator output
const totalTipEl = document.querySelector('#tip-amount');
const totalBillEl = document.querySelector('#total-amount');

let billAmount, tipAmount, peopleAmount;

// For looping rather than typing each out
const allContainers = [billContainer, tipContainer, peopleContainer];

// * ------------------------------------------------------------------------------------------

// FORM VALIDATING

function validateNumberInput(element, container, inputField) {
  // For UX
  const delay = setTimeout(() => {
    // General validation
    if (+element.value <= 0 || isNaN(+element.value)) {
      container.classList.add('show-error');
    } else {
      container.classList.remove('show-error');
    }

    // Input specific validation

    // For bill input, check that it doesn't have more than 2 decimal places
    if (
      inputField === 'bill' &&
      +element.value !== Math.round(+element.value * 100) / 100
    ) {
      container.classList.add('show-error');
    }

    // For custom tip input, allow it to be 0
    if (
      inputField === 'custom' &&
      element.value !== '' &&
      +element.value === 0
    ) {
      container.classList.remove('show-error');
    }

    // For people input, check that is an integer
    if (inputField === 'people' && !Number.isInteger(+element.value)) {
      container.classList.add('show-error');
    }

    clearTimeout(delay);
  }, 400);
}

// * ------------------------------------------------------------------------------------------

// EVENT LISTENERS

// Bill input
billEl.addEventListener('input', (e) => {
  billAmount = +e.target.value;
  validateNumberInput(billEl, billContainer, 'bill');
});

// Tip inputs
tipEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('tip-input')) {
    tipAmount = +e.target.value;
    customTipEl.value = '';
    tipContainer.classList.remove('show-error');

    e.target.classList.add('active');
  }
});

// Custom tip input
customTipEl.addEventListener('input', (e) => {
  tipAmount = +e.target.value;
  tipInputs.forEach((input) => input.classList.remove('active'));
  validateNumberInput(customTipEl, tipContainer, 'custom');
});

// People input
peopleEl.addEventListener('input', (e) => {
  peopleAmount = e.target.value;
  validateNumberInput(peopleEl, peopleContainer, 'people');
});

// Form change
formEl.addEventListener('change', () => {
  if (
    allContainers.some((container) =>
      container.classList.contains('show-error')
    )
  )
    return;

  const totalTip = ((billAmount * tipAmount) / 100 / peopleAmount).toFixed(2);
  const totalBill = (
    (billAmount * (1 + tipAmount / 100)) /
    peopleAmount
  ).toFixed(2);

  // To prevent updating before user has filled out the inputs
  if (isNaN(totalTip || totalBill)) return;
  if (totalTip == Infinity || totalBill == Infinity) return;

  totalTipEl.innerText = `$${totalTip}`;
  totalBillEl.innerText = `$${totalBill}`;
});

// Reset button
resetBtn.addEventListener('click', (e) => {
  billAmount = NaN;
  tipAmount = NaN;
  peopleAmount = NaN;

  allContainers.forEach((container) =>
    container.classList.remove('show-error')
  );

  totalTipEl.innerText = '$0.00';
  totalBillEl.innerText = '$0.00';

  e.target.blur();
});
