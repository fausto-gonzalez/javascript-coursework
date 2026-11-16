// For local use only: supply your own TMDB API key.
const api_key = ""; // TMDB API key
let movies = []; // stores objects(an instance of a class)
let cast = [];
let credits = [];
const MAX_CAST = 7;

const posterPrefix = "https://media.themoviedb.org/t/p/w300_and_h450_face";
const backdropPrefix =
  "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
const profilePrefix = "https://media.themoviedb.org/t/p/w138_and_h175_face";
const originalPrefix = "https://media.themoviedb.org/t/p/original";
const videoPrefix = "https://www.youtube.com/embed/";

const MAX_DESC_CHARS = 130;
const resultsDiv = document.querySelector("#results");
const watchlistControls = document.querySelector("#watchlistControls");

// sends a fetch request to tmdb that returns up to 20
// movies
function movieSearch() {
  const search = $("#query").val().trim();
  let results = fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=" +
      api_key +
      "&query=" +
      search,
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      movies.length = 0;
      for (let i = 0; i < data.results.length; i++) {
        const movie = new Movie(data.results[i]);
        movies.push(movie);
      }
      displayResults(); // very important that this goes in the THEN
    })
    .catch((err) => console.error(err));
  $("#query").val("");
  $("#query").focus();
} // movieSearch()

function displayResults() {
  // first clear the results div!
  resultsDiv.innerHTML = "";

  // loop through the movies and create a fancy card
  // for each movie
  for (let i = 0; i < movies.length; i++) {
    // create a card
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    if (movies[i].posterPath == null) {
      card.setAttribute(
        "style",
        `background: url(assets/images/noImageMovie.jpg); 
      background-size: cover; background-position: center;`,
      );
    } else {
      card.setAttribute(
        "style",
        `background: url(${posterPrefix + movies[i].posterPath}); 
      background-size: cover; background-position: center;`,
      );
    }

    // create an info div
    let info = document.createElement("div");
    info.setAttribute("class", "hideInfo");
    info.addEventListener("mouseenter", showInfo);
    info.addEventListener("mouseleave", hideInfo);

    // create a title h2
    let title = document.createElement("h2");

    if (!movies[i].releaseDate) {
      // if the releaseDate doesn't exist, it won't be added to the title
      title.innerText = movies[i].title;
    } else {
      // but if it exists, it will be added in this form: title (releaseYear)
      title.innerText = `${movies[i].title} (${movies[i].releaseDate.substr(0, 4)})`;
    }
    info.appendChild(title);

    // create an overview p
    let desc = document.createElement("p");
    let chars = movies[i].overview.length;

    if (chars >= MAX_DESC_CHARS) {
      desc.innerText = movies[i].overview.substr(0, MAX_DESC_CHARS) + "...";
    } else {
      desc.innerText = movies[i].overview;
    }
    info.appendChild(desc);

    // create a details button
    let viewBtn = document.createElement("button");
    viewBtn.setAttribute("value", movies[i].id);
    viewBtn.innerText = "see more...";
    viewBtn.addEventListener("click", getMovie);

    info.appendChild(viewBtn);

    card.appendChild(info);

    // finally add the card to the resultsDiv
    resultsDiv.appendChild(card);
  } // for
} // displayResults()

function showInfo(evt) {
  evt.currentTarget.classList.add("showInfo");
}
function hideInfo(evt) {
  evt.currentTarget.classList.remove("showInfo");
}

//====== EV Code ======//
function getMovie(evt) {
  let selMovie;

  // Movie search buttons use value, while watchlist cards and actor-page
  // movie posters use data-id. Prefer data-id whenever it is available.
  if (evt.currentTarget.dataset && evt.currentTarget.dataset.id) {
    selMovie = evt.currentTarget.dataset.id;
  } else {
    selMovie = evt.currentTarget.value;
  }

  // fetch the movie details
  fetch(
    `https://api.themoviedb.org/3/movie/${selMovie}?api_key=` +
      api_key +
      "&language=en-US",
  )
    .then((res) => res.json())
    .then((data) => {
      let movieDetails = new MovieDetails(data);
      showMovie(movieDetails);
    })
    .catch((err) => console.error(err));

  fetch(
    "https://api.themoviedb.org/3/movie/" +
      selMovie +
      "/credits?api_key=" +
      api_key,
  )
    .then((res) => res.json())
    .then((data) => {
      // first clear the castPics div
      document.querySelector("#castPics").innerHTML = "";
      cast.length = 0;
      let credits = new MovieCredits(data);

      for (let i = 0; i < credits.cast.length; i++) {
        const actor = credits.cast[i];
        cast.push(actor);
      }
      // console.log(cast);
      let size = 0;
      if (cast.length >= MAX_CAST) {
        size = MAX_CAST;
      } else {
        size = cast.length; // 1, 2, 3... 6
      }

      for (let i = 0; i < size; i++) {
        let castPic = document.createElement("img");

        if (cast[i].profilePath == null) {
          castPic.setAttribute("src", "assets/images/noImageActor.jpg");
        } else {
          castPic.setAttribute("src", `${profilePrefix}${cast[i].profilePath}`);
        }

        castPic.setAttribute("alt", cast[i].name);
        castPic.setAttribute("title", cast[i].name);
        castPic.setAttribute("data-id", cast[i].id);
        castPic.addEventListener("click", loadActorPage);
        document.querySelector("#castPics").appendChild(castPic);
      } // for
    })
    .catch((err) => console.error(err));
  // fetch the movie videos
  fetch(
    `https://api.themoviedb.org/3/movie/${selMovie}/videos?api_key=${api_key}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const movieVideos = new MovieVideos(data);

      // console.log(movieVideos);
      // console.log(movieVideos.results);
      document.querySelector("#youtubeVid").removeAttribute("src");
      if (movieVideos.results.length > 0) {
        document
          .querySelector("#youtubeVid")
          .setAttribute("src", `${videoPrefix}${movieVideos.results[0].key}`);
      } else {
        // do nothing background image placeholder already locked and loaded!
      }
    });
  document.querySelector("#watchBtn").setAttribute("data-id", selMovie);
  document.querySelector("#watchBtn").addEventListener("click", addWatch);

  // check this movie to see if it's in the list
} // getMovie()

function showMovie(movie) {
  // Disable scrolling on the webpage while the movie panel is open
  $("html, body").addClass("no-scroll");

  // sets the backdrop of the movie panel
  $("#backdrop").attr(
    "style",
    `background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 1)), url(${backdropPrefix + movie.backdropPath}); background-size: cover; background-position: center;`,
  );

  if (movie.posterPath == null) {
    $("#poster").attr("src", "assets/images/noImageMovie.jpg");
  } else {
    $("#poster").attr("src", posterPrefix + movie.posterPath);
  }
  $("#poster").attr("alt", movie.title);

  document.querySelector("#title").innerText = movie.title;
  document.querySelector("#releaseDateRuntime").innerHTML =
    '<span class="red">released:</span> ' +
    movie.releaseDate +
    '<span class="red"> runtime:</span> ' +
    movie.runtime +
    " mins";
  document.querySelector("#overview").innerText = movie.overview;

  $("#moviePanel").animate(
    {
      left: 0,
    },
    540,
    "swing",
  );

  // check the movie against savedMovies
  let currentList = localStorage.getItem("savedMovies");

  if (currentList == null) {
    // do nothing
  } else {
    // convert the currentList to an array
    let currentMovies = currentList.split(";");
    currentMovies.pop(); // why is this needed! a glitch
    let isSaved = false;
    let savedPos;
    for (let i = 0; i < currentMovies.length; i++) {
      if (movie.id == currentMovies[i]) {
        isSaved = true;
        savedPos = i;
      }
    } // for
    if (isSaved) {
      watchBtn.setAttribute("class", "watch");
    } else {
      watchBtn.setAttribute("class", "noWatch");
    }
  } // else
} // showMovie()

function hideMovie() {
  $("#moviePanel").animate(
    {
      left: "-100%",
    },
    320,
    "swing",
    function () {
      // Re-enable scrolling after the panel finishes closing
      $("html, body").removeClass("no-scroll");
    },
  );
} // hideMovie()

function addWatch(evt) {
  let id = evt.currentTarget.dataset.id;
  let watchBtn = document.querySelector("#watchBtn");

  // is there a savedMovies present in LS y/n
  let currentList = localStorage.getItem("savedMovies");

  // no - create the LS add movieID and set icon to GREEN
  if (currentList == null) {
    let item = id + ";";
    localStorage.setItem("savedMovies", item);
    watchBtn.setAttribute("class", "watch");
  } else {
    // yes there is a list
    // convert the currentList to an array
    let currentMovies = currentList.split(";"); // why is there an extra empty element?? ''
    currentMovies.pop(); // why is this needed! a glitch
    // is the movie saved? y/n
    let isSaved = false;
    let savedPos;
    for (let i = 0; i < currentMovies.length; i++) {
      if (id == currentMovies[i]) {
        isSaved = true;
        savedPos = i;
      }
    } // for
    if (isSaved) {
      // yes - remove from LS and set icon to RED
      currentMovies.splice(savedPos, 1);

      let newList = "";
      for (let i = 0; i < currentMovies.length; i++) {
        newList += currentMovies[i] + ";";
      }
      localStorage.removeItem("savedMovies");
      localStorage.setItem("savedMovies", newList);
      watchBtn.setAttribute("class", "noWatch");
    } else {
      // no - add to LS and set icon to GREEN
      let newList = "";
      for (let i = 0; i < currentMovies.length; i++) {
        newList += currentMovies[i] + ";";
      }
      newList += id + ";";
      localStorage.setItem("savedMovies", "");
      localStorage.setItem("savedMovies", newList);
      watchBtn.setAttribute("class", "watch");
    }
  } // else
  if (window.location.pathname === "/watchlist.html") {
    showWatchlist();
  }
} // addWatch()

//===========================>>
// the watchlist.html code

function showWatchlist() {
  // get a ref to the watchlist div on the watchlist.html page
  let watchlist = document.querySelector("#watchlist");
  watchlist.innerHTML = ""; // clear for each display!

  // get the savedMoves from LS
  let savedMovies = localStorage.getItem("savedMovies");

  // if it's empty
  if (savedMovies == null || savedMovies.length <= 0) {
    // display a default message
    let message = document.createElement("h1");
    message.innerText = "no movies saved...";

    watchlist.appendChild(message);
  } // if
  else {
    // split them into an array
    let movieList = savedMovies.split(";");
    movieList.pop(); // removes the empty collection item!

    // loop through the array
    // and fetch the info for each movieID
    // example movieList ['9675', '38982'];
    for (let i = 0; i < movieList.length; i++) {
      // fetch the info for the movie
      fetch(
        `https://api.themoviedb.org/3/movie/${movieList[i]}?api_key=` +
          api_key +
          "&language=en-US",
      )
        .then((res) => res.json())
        .then((data) => {
          let movieDetails = new MovieDetails(data);
          //===========================>>
          //=== UI for movies
          //=== div for the card ===>>
          let movieCard = document.createElement("div");
          movieCard.setAttribute("class", "movieCard");

          // poster
          let cardImg = document.createElement("img");
          cardImg.setAttribute("src", profilePrefix + movieDetails.posterPath);
          cardImg.setAttribute("alt", movieDetails.title);
          cardImg.setAttribute("data-id", movieDetails.id);
          cardImg.addEventListener("click", getMovie);
          movieCard.appendChild(cardImg);

          // title
          let title = document.createElement("h2");
          title.innerText = movieDetails.title;
          movieCard.appendChild(title);

          // desc
          let desc = document.createElement("p");
          if (movieDetails.overview.length > 260) {
            desc.innerText = movieDetails.overview.substr(0, 260) + "...";
          } else {
            desc.innerText = movieDetails.overview;
          }
          movieCard.appendChild(desc);

          // delete btn
          let delBtn = document.createElement("h3");
          delBtn.innerText = "[X]";
          delBtn.setAttribute("data-id", movieDetails.id);
          delBtn.addEventListener("click", deleteMovie);
          movieCard.appendChild(delBtn);

          // add movieCard to watchlist div
          watchlist.appendChild(movieCard);
        })
        .catch((err) => console.error(err));
    } // for
  } // else
} // showWatchlist()

function deleteMovie(evt) {
  let id = evt.currentTarget.dataset.id;
  let savedMovies = localStorage.getItem("savedMovies");
  let movieList = savedMovies.split(";");
  movieList.pop(); // removes the empty collection item!
  let pos;

  for (let i = 0; i < movieList.length; i++) {
    if (movieList[i] == id) {
      pos = i;
    }
  }
  movieList.splice(pos, 1);

  // write the new savedMovies to LS
  let newList = "";
  for (let i = 0; i < movieList.length; i++) {
    newList += movieList[i] + ";";
  }

  localStorage.setItem("savedMovies", "");
  localStorage.setItem("savedMovies", newList);
  showWatchlist();
} // unsaveMovie()

//================================>>
//=== ACTOR PAGE CODE BELOW ===>>

function loadActorPage(evt) {
  let id = evt.currentTarget.dataset.id;
  window.location = `actor.html?actID=${id}`;
} // loadActorPage()

// Actor gallery lightbox state
let actorGalleryImages = [];
let actorGalleryIndex = 0;

function showLightboxImage(index) {
  if (actorGalleryImages.length === 0) {
    return;
  }

  // Wrap around when the user moves before the first or after the last image.
  actorGalleryIndex =
    (index + actorGalleryImages.length) % actorGalleryImages.length;

  const lightboxImage = document.querySelector("#lightboxImage");
  lightboxImage.setAttribute("src", actorGalleryImages[actorGalleryIndex]);
  lightboxImage.setAttribute(
    "alt",
    `Actor gallery image ${actorGalleryIndex + 1} of ${actorGalleryImages.length}`,
  );
}

function openLightbox(index) {
  const lightbox = document.querySelector("#lightbox");
  if (!lightbox || actorGalleryImages.length === 0) {
    return;
  }

  showLightboxImage(index);
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden", "false");
  $("html, body").addClass("no-scroll");
}

function closeLightbox() {
  const lightbox = document.querySelector("#lightbox");
  if (!lightbox) {
    return;
  }

  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  document.querySelector("#lightboxImage").removeAttribute("src");
  $("html, body").removeClass("no-scroll");
}

function changeLightboxImage(change) {
  showLightboxImage(actorGalleryIndex + change);
}

function setupActorLightbox() {
  const gallery = document.querySelector("#gallery");
  const lightbox = document.querySelector("#lightbox");
  const closeBtn = document.querySelector("#lightboxClose");
  const prevBtn = document.querySelector("#lightboxPrev");
  const nextBtn = document.querySelector("#lightboxNext");

  if (!gallery || !lightbox || !closeBtn || !prevBtn || !nextBtn) {
    return;
  }

  // Event delegation also works on the slide clones created by bxSlider.
  gallery.addEventListener("click", (evt) => {
    if (!evt.target.matches(".bxslider img")) {
      return;
    }

    const index = Number(evt.target.dataset.galleryIndex);
    if (!Number.isNaN(index)) {
      openLightbox(index);
    }
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => changeLightboxImage(-1));
  nextBtn.addEventListener("click", () => changeLightboxImage(1));

  // Clicking the dark background closes the lightbox, but clicking the image
  // or the controls does not.
  lightbox.addEventListener("click", (evt) => {
    if (evt.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (lightbox.style.display !== "flex") {
      return;
    }

    if (evt.key === "Escape") {
      closeLightbox();
    } else if (evt.key === "ArrowLeft") {
      changeLightboxImage(-1);
    } else if (evt.key === "ArrowRight") {
      changeLightboxImage(1);
    }
  });
}

function getActor() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("actID"));

  setupActorLightbox();

  // select both the left & right actor divs
  let actorLeftDiv = document.querySelector("#actorLeft");
  let actorRightDiv = document.querySelector("#actorRight");

  // we can now do a TMDB fetch for data!!! mmm mmm data
  // there is at least 2 api calls or 3
  // ask TMDB for info on an actor based off the ID
  fetch(`https://api.themoviedb.org/3/person/${id}?api_key=` + api_key)
    .then((res) => res.json())
    .then((data) => {
      let actor = new Actor(data);
      // display actor basic details

      // large image/poster for actor
      let actorPoster = document.createElement("img");
      if (actor.profilePath == null) {
        actorPoster.setAttribute("src", "assets/images/noImageActor.jpg");
      } else {
        actorPoster.setAttribute("src", posterPrefix + actor.profilePath);
      }
      actorPoster.setAttribute("alt", actor.name);
      actorLeftDiv.appendChild(actorPoster);

      // actor name
      let actorName = document.createElement("h1");
      actorName.innerText = actor.name;
      document.querySelector("#bio").appendChild(actorName);

      // actor birthplace
      let actorHometown = document.createElement("h3");
      actorHometown.innerText = "Birthplace: " + actor.placeOfBirth;
      actorLeftDiv.appendChild(actorHometown);

      // actor birthyear
      let actorBirthYear = document.createElement("h3");
      actorBirthYear.innerText = "Birthday: " + actor.birthday;
      actorLeftDiv.appendChild(actorBirthYear);

      // actor passing year
      // year died (hopefully not yet)
      let actorPassed = document.createElement("h3");

      if (actor.deathday != null) {
        actorPassed.innerText = "Died: " + actor.deathday;
        actorLeftDiv.appendChild(actorPassed);
      } else if (actor.birthday) {
        let date = new Date();
        let year = date.getFullYear();
        let age = year - Number(actor.birthday.substr(0, 4));
        actorPassed.innerText = age + " years old";
        actorLeftDiv.appendChild(actorPassed);
      }

      // actor bio
      let bio = document.createElement("p");
      bio.innerText = actor.biography;
      document.querySelector("#bio").appendChild(bio);
    })
    .catch((err) => console.error(err));

  // another api call
  // a list of movies (8 or more) that the actor has starred in
  // these can be 'known for' or just most recent
  fetch(
    "https://api.themoviedb.org/3/person/" +
      id +
      "/movie_credits?api_key=" +
      api_key +
      "&language=en-US",
  )
    .then((res) => res.json())
    .then((data) => {
      const creditsDiv = document.querySelector("#credits");
      credits.length = 0;

      // Keep one credit per movie, then put the most popular movies first.
      const uniqueMovies = new Map();
      for (let i = 0; i < data.cast.length; i++) {
        const credit = new CastCredit(data.cast[i]);
        if (!uniqueMovies.has(credit.id)) {
          uniqueMovies.set(credit.id, credit);
        }
      }

      credits = Array.from(uniqueMovies.values()).sort(
        (a, b) => b.popularity - a.popularity,
      );

      // The assignment asks for at least 8 when available. Twelve works well
      // visually while still keeping the actor page manageable.
      const MAX_ACTOR_MOVIES = 12;
      const movieCount = Math.min(MAX_ACTOR_MOVIES, credits.length);

      for (let i = 0; i < movieCount; i++) {
        const credit = credits[i];
        const movieCard = document.createElement("div");
        const moviePic = document.createElement("img");
        const movieTitle = document.createElement("p");

        movieCard.setAttribute("class", "actorMovieCard");
        movieCard.setAttribute("data-id", credit.id);
        movieCard.setAttribute("title", `Open ${credit.title}`);
        movieCard.setAttribute("tabindex", "0");
        movieCard.setAttribute("role", "button");

        if (credit.posterPath == null) {
          moviePic.setAttribute("src", "assets/images/noImageMovie.jpg");
        } else {
          moviePic.setAttribute("src", posterPrefix + credit.posterPath);
        }

        moviePic.setAttribute("class", "credit");
        moviePic.setAttribute("alt", `${credit.title} poster`);

        movieTitle.innerText = credit.title;
        movieCard.appendChild(moviePic);
        movieCard.appendChild(movieTitle);

        movieCard.addEventListener("click", getMovie);
        movieCard.addEventListener("keydown", (evt) => {
          if (evt.key === "Enter" || evt.key === " ") {
            evt.preventDefault();
            getMovie(evt);
          }
        });

        creditsDiv.appendChild(movieCard);
      }

      if (movieCount === 0) {
        const noMovies = document.createElement("p");
        noMovies.innerText = "No movie credits are available for this actor.";
        creditsDiv.appendChild(noMovies);
      }
    })
    .catch((err) => console.error(err));

  // and another api call
  // a gallery of images (8 or more)
  // with a lightbox for the images

  fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${api_key}`)
    .then((res) => res.json())
    .then((data) => {
      const gallery = document.querySelector(".bxslider");
      gallery.innerHTML = "";
      actorGalleryImages.length = 0;

      data.profiles.forEach((profile, index) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const thumbnail = `https://image.tmdb.org/t/p/w500${profile.file_path}`;
        const fullImage = `${originalPrefix}${profile.file_path}`;

        actorGalleryImages.push(fullImage);
        img.setAttribute("src", thumbnail);
        img.setAttribute("data-gallery-index", index);
        img.setAttribute("alt", `Actor gallery image ${index + 1}`);
        img.setAttribute("title", "Click to enlarge");

        li.appendChild(img);
        gallery.appendChild(li);
      });

      if (actorGalleryImages.length > 0) {
        $(".bxslider").bxSlider({
          slideWidth: 200,
          minSlides: 1,
          maxSlides: 4,
          moveSlides: 1,
          slideMargin: 10,
          pager: actorGalleryImages.length > 1,
          controls: actorGalleryImages.length > 1,
          infiniteLoop: actorGalleryImages.length > 1,
        });
      } else {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.setAttribute("src", "assets/images/noImageActor.jpg");
        img.setAttribute("alt", "No actor gallery images available");
        li.appendChild(img);
        gallery.appendChild(li);
      }
    })
    .catch((err) => console.error(err));
} // getActor()

//=======================>>
//==== Get Trends ====>>
function getTrends() {
  fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=" + api_key)
    .then((res) => res.json())
    .then((data) => {
      let MAX_TRENDS = 4;
      let movieCount;
      if (data.results.length >= MAX_TRENDS) {
        movieCount = MAX_TRENDS;
      } else {
        movieCount = data.results.length;
      }
      movies.length = 0;
      for (let i = 0; i < movieCount; i++) {
        const movie = new Movie(data.results[i]);
        movies.push(movie);
      }
      displayResults(); // very important that this goes in the THEN
    })
    .catch((err) => console.error(err));
} // getTrends()

$(document).ready(() => {
  // Search when the user presses ENTER in the search box or clicks Find Movie.
  $("#query, #findMovie").on("keydown click", (evt) => {
    if (
      (evt.target.id === "query" &&
        evt.type === "keydown" &&
        evt.key === "Enter") ||
      (evt.target.id === "findMovie" && evt.type === "click")
    ) {
      movieSearch();
    }
  });

  // $(".bxslider").bxSlider();
});
