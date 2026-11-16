"use strict";

const isDate = (text) => {
  if (!/^[01]?\d\/[0-3]\d\/\d{4}$/.test(text)) {
    return false;
  }

  const index1 = text.indexOf("/");
  const index2 = text.indexOf("/", index1 + 1);
  const month = parseInt(text.substring(0, index1));
  const day = parseInt(text.substring(index1 + 1, index2));

  if (month < 1 || month > 12) {
    return false;
  } else {
    switch (month) {
      case 2:
        return day > 28 ? false : true; // This code does not takes into consideration leap years,
      // as I did on my assignment 3, ch10, reservation.js file
      case 4:
      case 6:
      case 9:
      case 11:
        return day > 30 ? false : true;
      default:
        return day > 31 ? false : true;
    }
  }
};

$(document).ready(() => {
  $("#save").click(() => {
    $("span").text(""); // clear any previous error messages
    let isValid = true; // initialize isValid flag

    const email = $("#email").val();
    const phone = $("#phone").val();
    const zip = $("#zip").val();
    const dob = $("#dob").val();

    if (email === "" || !email.match(/^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/)) {
      isValid = false;
      $("#email").next().text("Please enter a valid email.");
    }
    if (phone === "" || !phone.match(/^\d{3}-\d{3}-\d{4}$/)) {
      isValid = false;
      $("#phone")
        .next()
        .text("Please enter a phone number in NNN-NNN-NNNN format.");
    }
    if (zip === "" || !zip.match(/^\d{5}(-\d{4})?$/)) {
      // for Canadian postal code, the regex would be: /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][ -]?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/i

      isValid = false;
      $("#zip").next().text("Please enter a valid zip code.");
    }
    if (dob === "" || !isDate(dob)) {
      isValid = false;
      $("#dob").next().text("Please enter a valid date in MM/DD/YYYY format.");
    }

    if (isValid) {
      // code that saves profile info goes here
      const profile = []; // This creates a profile array.

      // This insert into the profile array, 4 new arrays, each one of dimension 2, with the first
      // element serving as the "key", and the sencond element serving as the "value". So, kind of a
      // key/value pairs.
      profile.push(["email", email]);
      profile.push(["phone", phone]);
      profile.push(["zip", zip]);
      profile.push(["dob", dob]);

      sessionStorage.profile = JSON.stringify(profile);
      // This could also have been done like this:
      // sessionStorage.setItem("profile", JSON.stringify(profile));

      // go to profile page
      location.href = "profile.html"; // Redirection...
    }

    $("#email").focus();
  });

  // set focus on initial load
  $("#email").focus();
});
