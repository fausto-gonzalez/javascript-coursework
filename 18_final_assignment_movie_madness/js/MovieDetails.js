class MovieDetails {
  constructor(data) {
    this.adult = data.adult;
    this.backdropPath = data.backdrop_path;
    this.belongsToCollection = data.belongs_to_collection;
    this.budget = data.budget;
    this.genres = data.genres;
    this.homepage = data.homepage;
    this.id = data.id;
    this.imdbId = data.imdb_id;
    this.originCountry = data.origin_country;
    this.originalLanguage = data.original_language;
    this.originalTitle = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.posterPath = data.poster_path;
    this.productionCompanies = data.production_companies;
    this.productionCountries = data.production_countries;
    this.releaseDate = data.release_date;
    this.revenue = data.revenue;
    this.runtime = data.runtime;
    this.softcore = data.softcore;
    this.spokenLanguages = data.spoken_languages;
    this.status = data.status;
    this.tagline = data.tagline;
    this.title = data.title;
    this.video = data.video;
    this.voteAverage = data.vote_average;
    this.voteCount = data.vote_count;
  }
}