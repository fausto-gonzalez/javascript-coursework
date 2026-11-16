
class Movie {
  constructor(movie) {
    this.adult = movie.adult;
    this.backdropPath = movie.backdrop_path;
    this.genreIds = movie.genre_ids;
    this.id = movie.id;
    this.title = movie.title;
    this.originalLanguage = movie.original_language;
    this.originalTitle = movie.original_title;
    this.overview = movie.overview;
    this.popularity = movie.popularity;
    this.posterPath = movie.poster_path;
    this.releaseDate = movie.release_date;
    this.video = movie.video;
    this.voteAverage = movie.vote_average;
    this.voteCount = movie.vote_count;
  } // constructor
} // class