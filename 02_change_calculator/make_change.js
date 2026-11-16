"use strict";

const $ = selector => document.querySelector(selector);

let cents = 0;
let quarters = 0;
let dimes = 0;
let nickels = 0;
let pennies = 0;

document.addEventListener("DOMContentLoaded", evt => {
  document.querySelector('#cents').focus();
  document.querySelector('#calculate').addEventListener('click', processEntry);
});

function processEntry() {
  cents = document.querySelector('#cents').value;

  // Data validation
  if (isNaN(cents) || cents == '' || cents < 0 || cents > 99 || !Number.isInteger(Number(cents))) {
    alert('\u274C Error:\nCents must be >= 0 and <= 99.');
    return;
  }

  cents = parseInt(cents);

  makeChange(cents);
}

function makeChange(tempCents) {
  quarters = Math.floor(tempCents / 25);
  tempCents = tempCents % 25;
  dimes = Math.floor(tempCents / 10);
  tempCents = tempCents % 10;
  nickels = Math.floor(tempCents / 5);
  tempCents = tempCents % 5;
  pennies = tempCents;

  document.querySelector('#quarters').value = quarters;
  document.querySelector('#dimes').value = dimes;
  document.querySelector('#nickels').value = nickels;
  document.querySelector('#pennies').value = pennies;
}

