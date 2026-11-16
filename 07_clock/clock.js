"use strict";
const $ = selector => document.querySelector(selector);

const padSingleDigit = num => num.toString().padStart(2, "0");

const displayCurrentTime = () => {
    const now = new Date();
    
    // I have these lines of code commented out because I wanted
    // to be able to test the clock display with a time other than
    // the current time.

    // now.setHours(now.getHours() - 8);
    // now.setMinutes(now.getMinutes() - 24);
    
    const hours = now.getHours();   // hours is the only variable (const)
                                    // that I keep as a number at first
                                    // because I need to do calculations
                                    // and comparisons with it. After that,
                                    // I convert it to a string using the
                                    // padSingleDigit function.
    
    const minutes = padSingleDigit(now.getMinutes());
    const seconds = padSingleDigit(now.getSeconds());

    $("#minutes").innerText = minutes;
    $("#seconds").innerText = seconds;

    if (hours === 0) {   // the midnight hour
        $("#hours").innerText = "12";
        $("#ampm").innerText = "AM";
    } else if (hours === 12) {   // the noon hour
        $("#hours").innerText = "12";
        $("#ampm").innerText = "PM";
    } else if (hours > 12) {    // between 1:00 PM and 11:59 PM
        $("#hours").innerText = padSingleDigit(hours - 12);
        $("#ampm").innerText = "PM";
    } else {    // between 1:00 AM and 11:59 AM
        $("#hours").innerText = padSingleDigit(hours);
        $("#ampm").innerText = "AM";
    }
};

document.addEventListener("DOMContentLoaded", () => {
	// set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.

    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
});