// Currently...

// User can begin input with a bunch of 0's followed by a number and it will work
// User can enter more than 2 decimal places. Either disallow entering more than 2 (for bill and custom tip) or let them type it out but then round it on form change. Same general idea for people input but with an integer.

const formEl = document.querySelector('#form');

const billEl = document.querySelector('#bill');
const tipEl = document.querySelector('.form__tip__options');
const peopleEl = document.querySelector('#people');

const customTipEl = document.querySelector('#custom-tip-input');

const tipInputs = document.querySelectorAll('.tip-input');
const tipLabels = document.querySelectorAll('.tip-label');
const resetBtn = document.querySelector('#reset-btn');

// Error handling
const billContainer = document.querySelector('#bill-container');
const tipContainer = document.querySelector('#tip-container');
const peopleContainer = document.querySelector('#people-container');

// Output
const totalTipEl = document.querySelector('#tip-amount');
const totalBillEl = document.querySelector('#total-amount');

let billAmount, tipAmount, peopleAmount;
let allowCalculation;

// Form validating / showing error messages
function validateNumberInput(element, container, inputField) {
  const delay = setTimeout(() => {
    if (+element.value <= 0 || isNaN(+element.value)) {
      container.classList.add('show-error');
      allowCalculation = false;
    } else {
      container.classList.remove('show-error');
      allowCalculation = true;
    }

    // For people input, check that is an integer
    if (inputField === 'people' && !Number.isInteger(+element.value)) {
      container.classList.add('show-error');
      allowCalculation = false;
    }

    // Allow custom tip input to be 0
    if (
      inputField === 'custom' &&
      element.value !== '' &&
      +element.value === 0
    ) {
      container.classList.remove('show-error');
      allowCalculation = true;
    }
    clearTimeout(delay);
  }, 1000);
}

// Bill input
billEl.addEventListener('input', (e) => {
  billAmount = +e.target.value;
  validateNumberInput(billEl, billContainer);
});

// Tip inputs
tipEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('tip-input')) {
    tipAmount = +e.target.value;
    customTipEl.value = '';
    tipContainer.classList.remove('show-error');
  }
});

// Custom tip input
customTipEl.addEventListener('input', (e) => {
  tipAmount = +e.target.value;
  tipLabels.forEach((el) => el.classList.remove('selected'));
  validateNumberInput(customTipEl, tipContainer, 'custom');
});

// People input
peopleEl.addEventListener('input', (e) => {
  peopleAmount = +e.target.value;
  validateNumberInput(peopleEl, peopleContainer, 'people');
});

// Form change
formEl.addEventListener('change', () => {
  if (!allowCalculation) return;

  const totalTip = ((billAmount * tipAmount) / 100 / peopleAmount).toFixed(2);
  const totalBill = (
    (billAmount * (1 + tipAmount / 100)) /
    peopleAmount
  ).toFixed(2);

  if (isNaN(totalTip || totalBill)) return;
  if (totalTip == Infinity || totalBill == Infinity) return;

  totalTipEl.innerText = `$${totalTip}`;
  totalBillEl.innerText = `$${totalBill}`;
});

// Reset button
resetBtn.addEventListener('click', (e) => {
  tipLabels.forEach((el) => el.classList.remove('selected'));
  billAmount = null;
  tipAmount = null;
  peopleAmount = null;

  billContainer.classList.remove('show-error');
  tipContainer.classList.remove('show-error');
  peopleContainer.classList.remove('show-error');

  totalTipEl.innerText = '$0.00';
  totalBillEl.innerText = '$0.00';

  e.target.blur();
});
