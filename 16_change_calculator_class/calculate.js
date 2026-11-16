"use strict";

$(document).ready(() => {
  $("#calculate").click(() => {
    // get the number of cents from the user
    let cents = $("#cents").val().trim();

    // creates a new instance of the class Coins, named coins
    const coins = new Coins();

    if (
      isNaN(cents) ||
      cents == "" ||
      cents < 0 ||
      cents > 99 ||
      !Number.isInteger(Number(cents))
    ) {
      // if there is any error with the value of cents
      alert("Please enter a valid integer number between 0 and 99.");
    } else {
      // if there isn't any errors with the value of cents
      coins.makeChange(cents);
      $("#quarters").val(coins.quarters);
      $("#dimes").val(coins.dimes);
      $("#nickels").val(coins.nickels);
      $("#pennies").val(coins.pennies);
    }

    // set focus on cents text box
    $("#cents").focus();
  }); // end click() method

  // set focus on cents text box on initial load
  $("#cents").focus();
}); // end ready() method
