// Currently...

// User can begin input with a bunch of 0's followed by a number and it will work
// Non-number inputs will give error message, but calculation still goes through
// ^^ Same for entering non-integer for people
// User can enter more than 2 decimal places. Either disallow entering more than 2 (for bill and custom tip) or let them type it out but then round it on form change. Same general idea for people input but with an integer.

const formEl = document.querySelector('#form');

const billEl = document.querySelector('#bill');
const tipEl = document.querySelector('.form__tip__options');
const peopleEl = document.querySelector('#people');

const customTipEl = document.querySelector('#custom-tip-input');

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
let usingCustomTip = false;

function roundTwoDecimals(e) {
  let t = e;
  e =
    t.indexOf('.') >= 0
      ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 3)
      : t;
  return e;
}

// Show red border and text if invalid input
function validateInput(element, container, inputField) {
  if (+element.value <= 0 || isNaN(+element.value)) {
    container.classList.add('show-error');
  } else {
    container.classList.remove('show-error');
  }

  if (inputField === 'people' && !Number.isInteger(+element.value)) {
    container.classList.add('show-error');
  }
}

billEl.addEventListener('keyup', (e) => {
  billAmount = +e.target.value;
  validateInput(billEl, billContainer);
});

tipEl.addEventListener('click', (e) => {
  // Click will register on both input and label.
  // If statements used to manipulate classes from the proper elements
  if (e.target.classList.contains('tip-input')) {
    tipAmount = +e.target.value;
    customTipEl.value = '';
    tipContainer.classList.remove('show-error');
  }

  if (e.target.classList.contains('tip-label')) {
    tipLabels.forEach((el) => el.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});

customTipEl.addEventListener('keyup', (e) => {
  usingCustomTip = true;
  tipAmount = +e.target.value;
  tipLabels.forEach((el) => el.classList.remove('selected'));
  validateInput(customTipEl, tipContainer);
});

peopleEl.addEventListener('keyup', (e) => {
  peopleAmount = +e.target.value;
  validateInput(peopleEl, peopleContainer, 'people');
});

formEl.addEventListener('change', () => {
  const totalTip = ((billAmount * tipAmount) / 100 / peopleAmount).toFixed(2);
  const totalBill = (
    (billAmount * (1 + tipAmount / 100)) /
    peopleAmount
  ).toFixed(2);

  if (isNaN(totalTip || totalBill) || peopleAmount === 0) return;

  totalTipEl.innerText = `$${totalTip}`;
  totalBillEl.innerText = `$${totalBill}`;
});

resetBtn.addEventListener('click', () => {
  tipLabels.forEach((el) => el.classList.remove('selected'));
  billAmount = 0;
  tipAmount = 0;
  peopleAmount = 1;

  totalTipEl.innerText = '$0';
  totalBillEl.innerText = '$0';
});
