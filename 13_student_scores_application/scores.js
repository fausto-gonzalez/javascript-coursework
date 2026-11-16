"use strict";

const scoreValues = [];
const studentNamesAndScores = [];

// I prefered to make a funtion out of this section, because it
// needs to be called from 2 different parts, inside the
// function displayScores and when sort_button is clicked.
const displayScoresTextArea = (scoresString) => {
  let textAreaString = "";

  for (let i = 0; i < scoresString.length; i++) {
    textAreaString += scoresString[i] + "\n";
  }

  $("#scores").val(textAreaString);
};

const displayScores = (scores, scoresString) => {
  // This part only calculates the average of all the
  // students' grades.
  let accum = 0;
  let average = 0;

  if (scores.length > 0) {
    for (const score of scores) {
      accum += score;
    }
    average = accum / scores.length;
  }

  $("#average_score").text(average.toFixed(2));

  // and then calls this function that displays:
  // lastName, firstName: score (new line: \n)
  // on the scores text area.
  displayScoresTextArea(scoresString);
};

$(document).ready(() => {
  $("#add_button").click(() => {
    let error = false; // reset the error flag to false

    // validation
    const firstName = $("#first_name").val().trim();
    const lastName = $("#last_name").val().trim();
    const score = $("#score").val().trim();

    // validating that firstName cannot be empty.
    if (firstName == "") {
      // if empty...
      error = true;
      $("#first_name").addClass("error");
    } else {
      $("#first_name").removeClass("error");
    }

    // validating that lastName cannot be empty.
    if (lastName == "") {
      // if empty...
      error = true;
      $("#last_name").addClass("error");
    } else {
      $("#last_name").removeClass("error");
    }

    // the score cannot be empty, not being a number, not being an integer number,
    // being less than 0 (negative numbers), or being greater than 100.
    if (
      score == "" ||
      isNaN(score) ||
      !Number.isInteger(Number(score)) ||
      score < 0 ||
      score > 100
    ) {
      error = true;
      $("#score").addClass("error");
    } else {
      $("#score").removeClass("error");
    }

    if (!error) {
      scoreValues.push(Number(score));
      studentNamesAndScores.push(lastName + ", " + firstName + ": " + score);

      displayScores(scoreValues, studentNamesAndScores);

      // get the add form ready for next entry
      $("#first_name").val("");
      $("#last_name").val("");
      $("#score").val("");
      $("#first_name").focus();
    }
  }); // end click()

  $("#clear_button").click(() => {
    $("#first_name").val("");
    $("#last_name").val("");
    $("#score").val("");

    // remove the score data from the web page
    $("#scores").val("");
    $("#average_score").text("");

    // clears both arrays
    scoreValues.length = 0;
    studentNamesAndScores.length = 0;

    // remove the error class, no matter if it was assigned or not,
    // to these HTML elements...
    $("#first_name").removeClass("error");
    $("#last_name").removeClass("error");
    $("#score").removeClass("error");

    $("#first_name").focus();
  }); // end click()

  $("#sort_button").click(() => {
    studentNamesAndScores.sort((a, b) => a.localeCompare(b));
    displayScoresTextArea(studentNamesAndScores);
  }); // end click()

  $("#first_name").focus();
}); // end ready()
