
// set the year in the footer
let today = new Date();
document.querySelector('#year').innerText = 
  today.getFullYear();

// #region Menu Code
let menuOpen = false;
const hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click', toggleMenu);

// links is a collection/array links[0] links[1]
let links = document.querySelectorAll('a');

// i is short for iterator(means loop)
for(let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', closeMenu);
}

function toggleMenu() {
  if(!menuOpen) {       // open menu
    $('nav').animate({
      right: 0
    }, 360, 'swing');
  }
  else {                // close menu
    $('nav').animate({
      right: -300
    }, 360, 'swing');
  }
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
} // toggleMenu()

function closeMenu() {
  $('nav').animate({
    right: -300
  }, 360, 'swing');
  menuOpen = false;
  hamburger.classList.remove('open');
} // closeMenu()
// #endregion