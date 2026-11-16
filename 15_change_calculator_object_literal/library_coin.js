"use strict";

// I had used Object Literals in the past, even though I didn't know they
// were called like that. But one thing I had never used, or even knew
// could be done, was defining methods inside Object Literals!
let coins = {
  quarters: 0,
  dimes: 0,
  nickels: 0,
  pennies: 0,
  makeChange(cents) {
    // cents = Math.floor(parseInt(cents));

    if (
      isNaN(cents) ||
      cents == "" ||
      cents < 0 ||
      cents > 99 ||
      !Number.isInteger(Number(cents))
    ) {
      // Throw a standard error with a custom message
      throw new Error("Please enter a valid integer number between 0 and 99.");
    } else {
      cents = parseInt(cents);

      // calculate the number of quarters
      let quarters = cents / 25; // get number of quarters
      this.quarters = Math.floor(quarters);
      cents = cents % 25; // assign the remainder to the cents variable

      // calculate the number of dimes
      let dimes = cents / 10; // get number of dimes
      this.dimes = Math.floor(dimes);
      cents = cents % 10; // assign the remainder to the cents variable

      // calculate the number of nickels
      let nickels = cents / 5;
      this.nickels = Math.floor(nickels);

      // calculate the number of nickels and pennies
      this.pennies = cents % 5;
    }
  },
};
