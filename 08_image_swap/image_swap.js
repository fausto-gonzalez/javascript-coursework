"use strict";

$(document).ready( () => {
	// preload images
	$("#image_list a").each( (index, element) => {
		const swappedImage = new Image();
		swappedImage.src = $(element).attr("href");
	});
	
	// set up event handlers for links    
	$("#image_list a").click( evt => {
		const link = evt.currentTarget;
		
		const imageURL = $(link).attr("href");
		const caption = $(link).attr("title");
		$("#image").fadeOut(1000, () => {
			$("#image").attr("src", imageURL);
			$("#image").fadeIn(1000);
		});
		
		$("#caption").fadeOut(1000, () => {
			$("#caption").text(caption);
			$("#caption").fadeIn(1000);
		});

		// cancel the default action of the link
	    evt.preventDefault();
	}); // end click
	
	// move focus to first thumbnail
	$("li:first-child a").focus();
}); // end ready