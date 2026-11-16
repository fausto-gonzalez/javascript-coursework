"use strict";

class Coins {
  /* 
  // Private variables. I didn't know, up to now, that JS supported this already!
  // I like it because I'm used to how things are done in Java, when I used to
  // program it long ago 😍 ...
  #quarters;
  #dimes;
  #nickels;
  #pennies;

  // constructor
  constructor(cents) {
    this.cents = cents;
  }

  // Getters ❤️😍...
  getQuarters() {
    return this.#quarters;
  }
  getDimes() {
    return this.#dimes;
  }
  getNickels() {
    return this.#nickels;
  }
  getPennies() {
    return this.#pennies;
  }

  // Setters ❤️😍...
  #setQuarters(quarters) {
    this.#quarters = quarters;
  }

  #setDimes(dimes) {
    this.#dimes = dimes;
  }

  #setNickels(nickels) {
    this.#nickels = nickels;
  }

  #setPennies(pennies) {
    this.#pennies = pennies;
  }
  */

  constructor() {
    this.quarters = 0;
    this.dimes = 0;
    this.nickels = 0;
    this.pennies = 0;
  }

  makeChange(cents) {
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
  }
}
