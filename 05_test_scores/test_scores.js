"use strict";
const $ = selector => document.querySelector(selector);

const names = ["Ben", "Joel", "Judy", "Anne"];
const scores = [88, 98, 77, 88];

let errorEvent = false;

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#add").addEventListener("click", addScore);
	$("#display_results").addEventListener("click", displayResults);
	$("#display_scores").addEventListener("click", displayScores);

	$("#name").focus();
});


function addScore() {
	errorEvent = false;

	let name = $("#name").value;
	let score = $("#score").value;
	let error = false;

	// Validate name
	if (name === "") {
		$("#nameError").innerHTML = "Please enter a name.";
		errorEvent = true;
	} else {
		$("#nameError").innerHTML = "";
	}

	// Validate score
	if (score === "" || isNaN(score) || score < 0 || score > 100) {
		$("#scoreError").innerHTML = "Score must be between 0 and 100.";
		errorEvent = true;
	} else {
		$("#scoreError").innerHTML = "";
	}

	if (!errorEvent) { // Only add the score if there are no errors
		names.push(name);
		scores.push(parseInt(score));
	}

	$("#name").focus();
}

function displayResults() {
	let average = 0;
	const highest = { name: "", score: 0 };

	for (let i = 0; i < scores.length; i++) {
		average += scores[i];
		if (scores[i] > highest.score) {
			highest.score = scores[i];
			highest.name = names[i];
		}
	}
	average /= scores.length;

	$("#results").innerHTML = `<h2>Results</h2>
														<p>Average score = ${parseInt(average)}</p>
														<p>High score = ${highest.name} with a score of ${highest.score}</p>`;
	
	$("#name").focus();
}

function displayScores() {
	$("#scores").innerHTML = "<h2>Scores</h2>";
	for (let i = 0; i < scores.length; i++) {
		// $("#scores").innerHTML += `<label>${names[i]}: ${scores[i]}</label><br>`;
		$("#scores").innerHTML += `<label>${names[i]}</label><label>${scores[i]}</label><br>`;
	}
	$("#name").focus();
}