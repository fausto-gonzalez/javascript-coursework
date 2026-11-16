"use strict";

$(document).ready( () => {
	
	const slider = $("#image_list");                     // slider = ul element
	let leftProperty = 0;
	let newLeftProperty = 0;
	

	$("#image_list a").click( evt => {
		const link = evt.currentTarget;
		const imageURL = $(link).attr("href");

		// page 291 of the book!
		// the css property is margin-left, but when in css there is
		// a hyphen, it translates into jQuery as camelCase, without
		// the hyphen, so css property margin-left -> marginLeft in jQuery.
		$("#image").animate({opacity: 0, marginLeft: "-=205"}, 
			1000, () => {
				$("#image").attr("src", imageURL);
				$("#image").animate({opacity: 1, marginLeft: "+=205"}, 1000);
			});

		// cancel the default action of the link, because if
		// I don't use this line of code, it'd open the image
		// as any normal <a> tag would do...
	  evt.preventDefault();

	});

	// the click event handler for the right button						
	$("#right_button").click( () => { 
		// get value of current left property
		leftProperty = parseInt(slider.css("left"));
		
		// determine new value of left property
		if (leftProperty - 300 <= -900) {
			newLeftProperty = 0; }
		else {
			newLeftProperty = leftProperty - 300; 
		}
		
		// use the animate function to change the left property
		slider.animate( {left: newLeftProperty}, 1000);
	});  // end click
	
	// the click event handler for the left button
	$("#left_button").click( () => {
		// get value of current right property
		leftProperty = parseInt(slider.css("left"));
		
		// determine new value of left property
		if (leftProperty < 0) {
			newLeftProperty = leftProperty + 300;
		} else {
			newLeftProperty = 0;
		}
		
		// use the animate function to change the left property
		slider.animate( {left: newLeftProperty}, 1000);				
	});  // end click	
	
}); // end ready