
class MovieVideos {
  constructor(data) {
    this.id = data.id;
    this.results = data.results.map(video => new Video(video));
  }
}

class Video {
  constructor(data) {
    this.iso_639_1 = data.iso_639_1;
    this.iso_3166_1 = data.iso_3166_1;
    this.name = data.name;
    this.key = data.key;
    this.site = data.site;
    this.size = data.size;
    this.type = data.type;
    this.official = data.official;
    this.id = data.id;
    this.published_at = data.published_at;
  }
}