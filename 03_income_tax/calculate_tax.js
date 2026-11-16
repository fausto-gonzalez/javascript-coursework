"use strict";
const $ = selector => document.querySelector(selector);

let income = 0;
let errorEvent = false;

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#calculate").addEventListener("click", processEntry);
	$("#income").addEventListener("keypress", event => {
		if (event.key === "Enter") {
			processEntry();
		}
	});
	$("#income").focus();

});

document.addEventListener("focus", event => {
	$("#income").focus();
});

function processEntry() {
	errorEvent = false;

	if (isNaN($("#income").value) || $("#income").value === "" || $("#income").value < 0) {
		alert('\u274C Error:\nIncome must be a positive number.');
		errorEvent = true;
	}
	
	if (!errorEvent) {
		income = parseFloat($("#income").value);
		calculateTax(income);
	}

	$("#income").focus();

}

function calculateTax(income) {
	income = parseInt(income);

	switch (true) {
		case income <= 9875:
			$("#tax").value = (income * 0.10).toFixed(2);
			break;
		case income <= 40125:
			$("#tax").value = (987.50 + (income - 9875) * 0.12).toFixed(2);
			break;
		case income <= 85525:
			$("#tax").value = (4617.50 + (income - 40125) * 0.22).toFixed(2);
			break;
		case income <= 163300:
			$("#tax").value = (14605.50 + (income - 85525) * 0.24).toFixed(2);
			break;
		case income <= 207350:
			$("#tax").value = (33271.50 + (income - 163300) * 0.32).toFixed(2);
			break;
		case income <= 518400:
			$("#tax").value = (47367.50 + (income - 207350) * 0.35).toFixed(2);
			break;
		default:
			$("#tax").value = (156235 + (income - 518400) * 0.37).toFixed(2);
			break;
	}

}