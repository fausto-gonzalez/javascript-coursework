"use strict";

$(document).ready(() => {
  $("#calculate").click(() => {
    // get the number of cents from the user
    let cents = $("#cents").val().trim();

    try {
      coins.makeChange(cents);
      $("#quarters").val(coins.quarters);
      $("#dimes").val(coins.dimes);
      $("#nickels").val(coins.nickels);
      $("#pennies").val(coins.pennies);
    } catch (error) {
      alert(error.message);
    }

    // set focus on cents text box
    $("#cents").focus();
  }); // end click() method

  // set focus on cents text box on initial load
  $("#cents").focus();
}); // end ready() method
