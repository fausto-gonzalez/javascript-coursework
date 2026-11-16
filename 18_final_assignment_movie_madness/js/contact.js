const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const body = [
    "Name: " + fields.get("name"),
    "Email: " + fields.get("email"),
    "",
    fields.get("comment"),
  ].join("\r\n");
  window.location.href =
    "mailto:fausto.gonzalezescobar@triosstudent.com?subject=Movie%20Madness%20feedback&body=" +
    encodeURIComponent(body);
});
