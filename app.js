const formEl = document.querySelector('#form');

const billEl = document.querySelector('#bill');
const tipEl = document.querySelector('.form__tip__options');
const peopleEl = document.querySelector('#people');

const tipLabels = document.querySelectorAll('.tip-label');
const resetBtn = document.querySelector('#reset-btn');

// Output
const totalTipEl = document.querySelector('#tip-amount');
const totalBillEl = document.querySelector('#total-amount');

let billAmount, tipAmount;
let peopleAmount = 1;

billEl.addEventListener('keyup', (e) => {
  billAmount = +e.target.value;
  console.log(billAmount);
});

tipEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('tip-input')) {
    tipAmount = +e.target.value;
    console.log(tipAmount);
  }

  if (e.target.classList.contains('tip-label')) {
    tipLabels.forEach((el) => el.classList.remove('selected'));
    e.target.classList.toggle('selected');
  }
});

peopleEl.addEventListener('keyup', (e) => {
  peopleAmount = +e.target.value;
  console.log(peopleAmount);
});

formEl.addEventListener('change', () => {
  const totalTip = ((billAmount * tipAmount) / 100 / peopleAmount).toFixed(2);
  const totalBill = (
    (billAmount * (1 + tipAmount / 100)) /
    peopleAmount
  ).toFixed(2);

  if (isNaN(totalTip || totalBill)) return;

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
