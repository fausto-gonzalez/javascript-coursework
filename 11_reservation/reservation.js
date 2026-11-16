"use strict";

$(document).ready( () => {
	const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/; // MM/DD/YYYY
	const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // 999-999-9999

	$("#arrival_date").attr("maxlength", 10);
	$("#arrival_date").attr("placeholder", "MM/DD/YYYY");
	$("#arrival_date").focus();

	$("#reservation_form").on("submit", evt => {
		// This clears any previous error messages 
		// that may have been displayed on the form 
		// for any previous attempts to submit it.
		$("#arrival_date + span").text("");
		$("#nights + span").text("");
		$("#name + span").text("");
		$("#email + span").text("");
		$("#phone + span").text("");


    // form validation...
		const errorList = {
			arrival_date: [],
			nights: [],
			name: [],
			email: [],
			phone: []
		};
		let errors = false;
		let invalidArrivalDate = false;

		const arrivalDate = $("#arrival_date").val().trim();
		const nights = $("#nights").val().trim();

		// These variables are not needed in this form validation, but I leave this
		// code in here just for future reference.
		//
		// const adults = $("#adults").val();
		// const children = $("#children").val();
		// const roomType = $("input[name='room']:checked").attr("id");
		// const bedType = $("input[name='bed']:checked").attr("id");
		// const smoking = $("#smoking").is(":checked");
		
		const name = $("#name").val().trim();
		const email = $("#email").val().trim();
		const phone = $("#phone").val().trim();

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		let arrivalDateMonth = 0;
		let arrivalDateDay = 0;
		let arrivalDateYear = 0;

		// Trimming white spaces at the beginning and at the end of
		// these fields:
		$("#arrival_date").val(arrivalDate);
		$("#nights").val(nights);
		$("#name").val(name);
		$("#email").val(email);
		$("#phone").val(phone);

		if (arrivalDate === "") {
			errorList.arrival_date.push("This field is required.");
			errors = true;

		} else if (!datePattern.test(arrivalDate)) {
			// arrivalDate doesn't have the date format: (MM/DD/YYYY)
			errorList.arrival_date.push("Must use MM/DD/YYYY format.");
			errors = true;

		} else {
			// arrivalDate has the date format: (MM/DD/YYYY)
			// so that's why I can execute these next 3 lines without a problem...
			arrivalDateMonth = parseInt(arrivalDate.substr(0, 2));
			arrivalDateDay = parseInt(arrivalDate.substr(3, 2));
			arrivalDateYear = parseInt(arrivalDate.substr(6, 4));

			switch (arrivalDateMonth) {
				case 4:		// Apr
				case 6:		// Jun
				case 9:		// Sep
				case 11:	// Nov
					if (arrivalDateDay > 30) {
						invalidArrivalDate = true;
						errors = true;
					} 
					break;
			
				case 2:		// Feb
					if (arrivalDateDay >= 30) {
						invalidArrivalDate = true;
						errors = true;
					} else if (arrivalDateDay === 29) {
						if (arrivalDateYear % 4 !== 0 || (arrivalDateYear % 100 === 0 && arrivalDateYear % 400 !== 0)) {
    				// not a leap year
						invalidArrivalDate = true;
						errors = true;
						}
					}
					break;
			}

			if (invalidArrivalDate) {
				errorList.arrival_date.push("Must be a valid date.");
			}

		}

		if (errorList.arrival_date.length === 0) {
			const arrivalDateObject = new Date(arrivalDateYear, arrivalDateMonth - 1, arrivalDateDay);
			arrivalDateObject.setHours(0, 0, 0, 0);

			if (arrivalDateObject < today ) {
				errorList.arrival_date.push("Cannot be before today.");
				errors = true;
			}
			
		}

		// Assigns the first error in errorList.arrival_date to the
		// <span> element next to the <input id="arrival_date" type="text">
		if (errorList.arrival_date.length > 0) {
			$("#arrival_date + span").text(errorList.arrival_date[0]);
		}
		

		if (nights === "") {
			errorList.nights.push("This field is required.");
			errors = true;
		} else if (isNaN(nights)) {
			errorList.nights.push("Must be numeric.");
			errors = true;
		} else if (!Number.isInteger(Number(nights))) {
			errorList.nights.push("Must be a whole number.");
			errors = true;
		} else if (Number(nights) <= 0) {
			errorList.nights.push("Must be greater than 0.");
			errors = true;
		}

		// Assigns the first error in errorList.nights to the
		// <span> element next to the <input id="nights" type="text">
		if (errorList.nights.length > 0) {
			$("#nights + span").text(errorList.nights[0]);
		}


		if (name === "") {
			errorList.name.push("This field is required.");
			errors = true;

			// Assigns the error in errorList.name to the
			// <span> element next to the <input id="name" type="text">
			$("#name + span").text(errorList.name[0]);
		}


		if (email === "") {
			errorList.email.push("This field is required.");
			errors = true;
		} else if (!emailPattern.test(email)) {
			errorList.email.push("Must be a valid email address.");
			errors = true;
		}

		// Assigns the first error in errorList.email to the
		// <span> element next to the <input id="email" type="text">
		if (errorList.email.length > 0) {
			$("#email + span").text(errorList.email[0]);
		}


		if (phone === "") {
			errorList.phone.push("This field is required.");
			errors = true;
		} else if (!phonePattern.test(phone)) {
			errorList.phone.push("Must be a valid phone number.");
			errors = true;
		}

		// Assigns the first error in errorList.phone to the
		// <span> element next to the <input id="phone" type="text">
		if (errorList.phone.length > 0) {
			$("#phone + span").text(errorList.phone[0]);
		}


		if (errors) {
			// If there were any errors, don't submit the form
			evt.preventDefault();
		}
	});
}); // end ready