"use strict";
const $ = selector => document.querySelector(selector);

/*********************
*  helper functions  *
**********************/
const calculateCelsius = temp => (temp-32) * 5/9;
const calculateFahrenheit = temp => temp * 9/5 + 32;

const toggleDisplay = (label1Text, label2Text) => {
	$("#degree_label_1").innerHTML = label1Text;
	$("#degree_label_2").innerHTML = label2Text;

	$("#degrees_computed").value = "";
}

/****************************
*  event handler functions  *
*****************************/
const convertTemp = () => {   
	let degreesEntered = $("#degrees_entered").value;
	let degreesComputed;

	// Validate the input
	if (isNaN(degreesEntered)) {
		$("#message").innerHTML = "You must enter a valid number for degrees.";
		$("#degrees_entered").focus();
		return;
	} else {
		$("#message").innerHTML = "";
	}

	degreesEntered = parseFloat(degreesEntered);

	if ($("#to_celsius").checked) {
		degreesComputed = Math.round(calculateCelsius(degreesEntered));
	} else {
		degreesComputed = Math.round(calculateFahrenheit(degreesEntered));
	}
	$("#degrees_computed").value = degreesComputed;
};

const toCelsius = () => toggleDisplay("Enter F degrees:", "Degrees Celsius:");
const toFahrenheit = () => toggleDisplay("Enter C degrees:", "Degrees Fahrenheit:");

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#convert").addEventListener("click", convertTemp);
    $("#to_celsius").addEventListener("click", toCelsius);
    $("#to_fahrenheit").addEventListener("click", toFahrenheit);
	
	// move focus
	$("#degrees_entered").focus();
});