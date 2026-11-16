"use strict";
$(document).ready(() => {
  $("#new_game").click(() => {
    // clear any previous data from the page
    $("#result").text("");
    $("#score1").val("0");
    $("#score2").val("0");
    $("#die").val("0");
    $("#total").val("0");

    // reset the game object and then start a new game, passing in
    // the players' names
    game.reset().start($("#player1").val(), $("#player2").val());

    // if the game object contains valid data...
    if (game.isValid) {
      // display the "turn" div, use the currentPlayer property of
      // the game object to display the name of the player whose turn
      // it is, and set the focus on the Roll button
      $("#turn").removeClass("hide");
      $("#current").text(game.currentPlayer.name);
      $("#roll").focus();
    } else {
      // hide the "turn" div, notify the user to enter player names,
      // and set the focus on the Player 1 text box
      $("#turn").addClass("hide");
      alert("Please enter two player names.");
      $("#player1").focus();
    }
  }); // end click()

  $("#roll").click(() => {
    // use the currentPlayer property of the game object to take a turn
    game.currentPlayer.takeTurn();
    // set the value of the Die text box to the value of the roll
    // property of the currentPlayer property
    $("#die").val(game.currentPlayer.roll);
    // check the read-only isBust property for the current player.
    if (game.currentPlayer.isBust) {
      // If it's true,
      // set the value of the Total text box to zero
      $("#total").val(0);
      // use the game object to change players,
      game.changePlayer();
      // and use the currentPlayer property of
      // the game object to display the name of the player whose turn
      // it now is.
      $("#current").text(game.currentPlayer.name);
    } else {
      // Otherwise, set the value of the Total text box to the
      // value of the turn property of currentPlayer.
      $("#total").val(game.currentPlayer.turn);
    }

    // set the focus on the Roll button
    $("#roll").focus();
  }); // end click()

  $("#hold").click(() => {
    // use the game object to hold, passing in the Score1 and Score2 elements.
    game.hold($("#score1"), $("#score2"));
    // Then use the game object to check the winner, storing the result in a
    // variable.
    let winner = game.checkWinner();
    if (winner === "none") {
      // set the value of the Die and Total text boxes to zero,
      $("#die").val(0);
      $("#total").val(0);
      // use the game object to change players,
      game.changePlayer();
      // use the currentPlayer property of the game object to
      // display the name of the player whose turn it now is
      $("#current").text(game.currentPlayer.name);
      // and set the focus on the Roll button.
      $("#roll").focus();
    } else {
      // Otherwise, set the
      // value of the result span element to indicate the name of the winner.
      $("#result").text(`${winner} wins!`);
    }
  }); // end click()

  // set focus on initial page load
  $("#player1").focus();
}); // end ready()
