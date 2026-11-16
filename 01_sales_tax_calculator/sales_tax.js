"use strict";

const $ = selector => document.querySelector(selector);

let errorEvent = false;
let subtotal = 0;
let taxRate = 0;
let salesTax = 0;
let total = 0;

document.addEventListener("DOMContentLoaded", evt => {
  document.querySelector('#subtotal').focus();

  document.querySelector('#calculate').addEventListener('click', processEntries);
  document.querySelector('#clear').addEventListener('click', clearForm);

  document.querySelector('#subtotal').addEventListener('click', subtotalClick);
  document.querySelector('#tax_rate').addEventListener('click', taxRateClick);
});

// I keep this comment here becase this is new for me and I want to remember it...
// $('#calculate').addEventListener('click', processEntries);
// $('#clear').addEventListener('click', clearForm);

function processEntries() {
  errorEvent = false;
  subtotal = document.querySelector('#subtotal').value;
  taxRate = document.querySelector('#tax_rate').value;

  // Data validation
  if (isNaN(subtotal) || subtotal == '' || subtotal <= 0 || subtotal >= 10000) {
    alert('\u274C Error:\nSubtotal must be > 0 and < 10000.');
    errorEvent = true;
  }

  if (isNaN(taxRate) || taxRate == '' || taxRate <= 0 || taxRate >= 12) {
    alert('\u274C Error:\nTax Rate must be > 0 and < 12.');
    errorEvent = true;
  }

  if (!errorEvent) { // If no errors, calculate sales tax and total
    subtotal = parseFloat(subtotal);
    taxRate = parseFloat(taxRate);
    
    salesTax = subtotal * taxRate/100;
    total = subtotal + salesTax;

    document.querySelector('#sales_tax').value = salesTax.toFixed(2);
    document.querySelector('#total').value = total.toFixed(2);
  }

  document.querySelector('#subtotal').focus();
}

function clearForm() {
  subtotalClick();
  taxRateClick();
  document.querySelector('#sales_tax').value = '';
  document.querySelector('#total').value = '';
  subtotal = 0;
  taxRate = 0;
  salesTax = 0;
  total = 0;

  document.querySelector('#subtotal').focus();
}

function subtotalClick() {
  document.querySelector('#subtotal').value = '';
}

function taxRateClick() {
  document.querySelector('#tax_rate').value = '';
}
