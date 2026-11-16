"use strict";

$(document).ready(() => {
  const profile = JSON.parse(sessionStorage.profile);

  for (let i = 0; i < profile.length; i++) {
    const profileEntry = profile[i];
    // I know that profileEntry is an array with 2 elements, with the first element (profileEntry[0])
    // being the "key", and the second element (profileEntry[1]) being the "value".
    // It works like a key/value pair.
    const key = profileEntry[0];
    const value = profileEntry[1];

    $(`#${key}`).text(value); // Dynamically selects the HTML element with id=key (which are all spans)
    // and assigns the value as its text content.
  }

  $("#back").click(() => {
    history.back();
  }); // end of click()
}); // end of ready()
