class CastMember {
  constructor(data) {
    this.adult = data.adult;
    this.gender = data.gender;
    this.id = data.id;
    this.knownForDepartment = data.known_for_department;
    this.name = data.name;
    this.originalName = data.original_name;
    this.popularity = data.popularity;
    this.profilePath = data.profile_path;
    this.castId = data.cast_id;
    this.character = data.character;
    this.creditId = data.credit_id;
    this.order = data.order;
  }
}

class CrewMember {
  constructor(data) {
    this.adult = data.adult;
    this.gender = data.gender;
    this.id = data.id;
    this.knownForDepartment = data.known_for_department;
    this.name = data.name;
    this.originalName = data.original_name;
    this.popularity = data.popularity;
    this.profilePath = data.profile_path;
    this.creditId = data.credit_id;
    this.department = data.department;
    this.job = data.job;
  }
}

class MovieCredits {
  constructor(data) {
    this.id = data.id;
    this.cast = [];
    this.crew = [];

    for (let i = 0; i < data.cast.length; i++) {
      this.cast.push(new CastMember(data.cast[i]));
    }

    for (let i = 0; i < data.crew.length; i++) {
      this.crew.push(new CrewMember(data.crew[i]));
    }
  }
}