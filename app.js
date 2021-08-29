async function getCharacters(result) {
  const people = JSON.parse(result);
  document.getElementById("back-btn").style.display = "none"
  document.getElementById("pagination").style.display = "block"
  console.log(people)

  const content = document.getElementById("content");
  for (const person of people.results) {
    const div = document.createElement("div");
    div.classList.add("person-block");
    const header = document.createElement("div");
    header.classList.add("person-header");
    const personLink = person.url.split("https://swapi.dev/api/people/")
    const personID = personLink[1].replace("/", "")
    header.innerHTML = "<a href='characters.html?id="+personID+"'> " + person.name + "</a>";
    const personPlanet = await getPersonPlanet(person.homeworld)
    header.innerHTML += "<span> Home world: " + personPlanet.name + "</span>";

    div.append(header);

    const about = document.createElement("div");
    about.classList.add("person-about");

    // About person
    const aboutPerson = document.createElement("div");
    if(person.height !== "n/a")
     aboutPerson.innerHTML += "<p><span>Height: " + person.height + "</span></p>";
    if(person.mass !== "n/a")
      aboutPerson.innerHTML += "<p><span>Mass: " + person.mass + "</span></p>";
    if(person.gender !== "n/a")
      aboutPerson.innerHTML += "<p><span>Gender: " + person.gender + "</span></p>";
    if(person.hair_color !== "n/a")
      aboutPerson.innerHTML += "<p><span>Hair color: " + person.hair_color + "</span></p>";
    if(person.eye_color !== "n/a")
      aboutPerson.innerHTML += "<p><span>Eye color: " + person.eye_color + "</span></p>";
      if(person.skin_color !== "n/a")
      aboutPerson.innerHTML += "<p><span>Skin color: " + person.skin_color + "</span></p>";
    about.append(aboutPerson);

    // Films person
    const filmsPerson = document.createElement("div");
    if(person.films.length > 0)
      filmsPerson.innerHTML += "<p><span>Films (" + person.films.length + ") </span></p>";
    if(person.starships.length > 0)
      filmsPerson.innerHTML += "<p><span>Starships (" + person.starships.length + ")</span></p>";
    if(person.species.length > 0)
      filmsPerson.innerHTML += "<p><span>Species (" + person.species.length + ")</span></p>";
    if(person.vehicles.length > 0)
      filmsPerson.innerHTML += "<p><span>Vehicles (" + person.vehicles.length + ")</span></p>";
    about.append(filmsPerson);

    div.append(about);
    content.append(div);
  }
}

async function getCharacterID (result) {
  const person = JSON.parse(result)
  document.getElementById("back-btn").style.display = "block"
  document.getElementById("pagination").style.display = "none"
  document.getElementById("page-title").innerText = "Character: "+person.name
  const content = document.getElementById("content");
  console.log(person)
  const div = document.createElement("div");
  div.classList.add("person-block");
  const header = document.createElement("div");
  header.classList.add("person-header");
  header.innerHTML = "<h2> About: </h2>";
  const personPlanet = await getPersonPlanet(person.homeworld)
  header.innerHTML += "<span> Home world: " + personPlanet.name + "</span>";

  div.append(header);

  const about = document.createElement("div");
  about.classList.add("person-about");

  // About person
  const aboutPerson = document.createElement("div");
  if(person.height !== "n/a")
   aboutPerson.innerHTML += "<p><span>Height: " + person.height + "</span></p>";
  if(person.mass !== "n/a")
    aboutPerson.innerHTML += "<p><span>Mass: " + person.mass + "</span></p>";
  if(person.gender !== "n/a")
    aboutPerson.innerHTML += "<p><span>Gender: " + person.gender + "</span></p>";
  if(person.hair_color !== "n/a")
    aboutPerson.innerHTML += "<p><span>Hair color: " + person.hair_color + "</span></p>";
  if(person.eye_color !== "n/a")
    aboutPerson.innerHTML += "<p><span>Eye color: " + person.eye_color + "</span></p>";
    if(person.skin_color !== "n/a")
    aboutPerson.innerHTML += "<p><span>Skin color: " + person.skin_color + "</span></p>";
  about.append(aboutPerson);

  // Films person
  const filmsPerson = document.createElement("div");
  if(person.films.length > 0)
    filmsPerson.innerHTML += "<p><span>Films (" + person.films.length + ") </span></p>";
  if(person.starships.length > 0)
    filmsPerson.innerHTML += "<p><span>Starships (" + person.starships.length + ")</span></p>";
  if(person.species.length > 0)
    filmsPerson.innerHTML += "<p><span>Species (" + person.species.length + ")</span></p>";
  if(person.vehicles.length > 0)
    filmsPerson.innerHTML += "<p><span>Vehicles (" + person.vehicles.length + ")</span></p>";
  about.append(filmsPerson);

  const filmsBlock = document.createElement("div");
  filmsBlock.classList.add("person-block");

  const headerFilm = document.createElement("div");
  headerFilm.classList.add("person-header");
  headerFilm.innerHTML = "<h2> Films: </h2>";
  filmsBlock.append(headerFilm);

  const filmsContent = document.createElement("div");
  // filmsContent.classList.add("person-about");
  
  const films = await getArray(person.films)
  for (const film of films) {
    const filmLink = film.url.split("https://swapi.dev/api/films/")
    const filmID = filmLink[1].replace("/", "")
    filmsContent.innerHTML += "<a href='films.html?id="+filmID+"'>"+film.title+"</p>"
  }

  filmsBlock.append(filmsContent)

  div.append(about);
  content.append(div);
  content.append(filmsBlock);
}

function getPersonPlanet(uri) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let palnet = {}
  
  const result = fetch(uri, requestOptions)
  .then(response => response.text())
  .then(result => palnet = JSON.parse(result))
  .catch(error => console.log('error', error));
  return result
}

async function getFilms(result) {
  const films = JSON.parse(result);
  document.getElementById("back-btn").style.display = "none"
  console.log(films)

  const content = document.getElementById("content");
  for (const film of films.results) {
    const div = document.createElement("div");
    div.classList.add("person-block");

    const header = document.createElement("div");
    header.classList.add("person-header");
    const splitLink = film.url.split("https://swapi.dev/api/films/")
    const filmID = splitLink[1].replace("/", "")
    header.innerHTML = "<a href='films.html?id="+filmID+"'> " + film.title + "</a>";
    if(film.opening_crawl !== "n/a")
      header.innerHTML += "<p>" + film.opening_crawl + "</p>";

    div.append(header);

    const about = document.createElement("div");
    about.classList.add("person-about");

    // About person
    const aboutFilm = document.createElement("div");
    if(film.director !== "n/a")
      aboutFilm.innerHTML += "<p><span>Director: " + film.director + "</span></p>";
    if(film.producer !== "n/a")
      aboutFilm.innerHTML += "<p><span>Producer: " + film.producer + "</span></p>";
    if(film.release_date !== "n/a")
      aboutFilm.innerHTML += "<p><span>Release date: " + film.release_date + "</span></p>";
    about.append(aboutFilm);

    // Films person
    const charactersFilm = document.createElement("div");
    if(film.characters.length > 0)
      charactersFilm.innerHTML += "<p><span>Characters (" + film.characters.length + ") </span></p>";
    if(film.starships.length > 0)
      charactersFilm.innerHTML += "<p><span>Starships (" + film.starships.length + ")</span></p>";
    if(film.species.length > 0)
      charactersFilm.innerHTML += "<p><span>Species (" + film.species.length + ")</span></p>";
    if(film.vehicles.length > 0)
      charactersFilm.innerHTML += "<p><span>Vehicles (" + film.vehicles.length + ")</span></p>";
    if(film.planets.length > 0)
      charactersFilm.innerHTML += "<p><span>Planets (" + film.planets.length + ")</span></p>";
    about.append(charactersFilm);

    div.append(about);
    content.append(div);
  }
}

async function getFilmID (result) {
  const film = JSON.parse(result)
  document.getElementById("back-btn").style.display = "block"

  const content = document.getElementById("content");
  console.log(film)
  document.getElementById("page-title").innerText = "film: "+film.title
  const aboutBlock = document.createElement("div");
  aboutBlock.classList.add("person-block");

  const header = document.createElement("div");
  header.classList.add("person-header");
  const splitLink = film.url.split("https://swapi.dev/api/films/")
  const filmID = splitLink[1].replace("/", "")
  header.innerHTML = "<a> About </a>";
  if(film.opening_crawl !== "n/a")
    header.innerHTML += "<p>" + film.opening_crawl + "</p>";

  aboutBlock.append(header);

  const about = document.createElement("div");
  about.classList.add("person-about");

  const aboutFilm = document.createElement("div");
  if(film.director !== "n/a")
    aboutFilm.innerHTML += "<p><span>Director: " + film.director + "</span></p>";
  if(film.producer !== "n/a")
    aboutFilm.innerHTML += "<p><span>Producer: " + film.producer + "</span></p>";
  if(film.release_date !== "n/a")
    aboutFilm.innerHTML += "<p><span>Release date: " + film.release_date + "</span></p>";
  about.append(aboutFilm);
  aboutBlock.append(about);

      // Films person
      const charactersFilm = document.createElement("div");
      if(film.starships.length > 0)
        charactersFilm.innerHTML += "<p><span>Starships (" + film.starships.length + ")</span></p>";
      if(film.species.length > 0)
        charactersFilm.innerHTML += "<p><span>Species (" + film.species.length + ")</span></p>";
      if(film.vehicles.length > 0)
        charactersFilm.innerHTML += "<p><span>Vehicles (" + film.vehicles.length + ")</span></p>";
      if(film.planets.length > 0)
        charactersFilm.innerHTML += "<p><span>Planets (" + film.planets.length + ")</span></p>";
      about.append(charactersFilm);

  const charactersBlock = document.createElement("div");
  charactersBlock.classList.add("person-block");
  const charactersHeader = document.createElement("div");
  charactersHeader.classList.add("person-header");
  charactersHeader.innerHTML = "<a> Characters </a>";
  charactersBlock.append(charactersHeader);

  const charactersContent = document.createElement("div");
  // charactersContent.classList.add("person-about");

  const characters = await getArray(film.characters)
  for(const person of characters) {
    const personLink = person.url.split("https://swapi.dev/api/people/")
    const personID = personLink[1].replace("/", "")
    charactersContent.innerHTML += "<a href='characters.html?id="+personID+"'>"+person.name+"</p>"
  }
  charactersBlock.append(charactersContent);

  // const starships = await getArray(film.starships)
  // const species = await getArray(film.species)
  // const vehicles = await getArray(film.vehicles)
  // const planets = await getArray(film.planets)

  content.append(aboutBlock);
  content.append(charactersBlock);
}

async function getArray(array) {
  let list = []
  for(const url of array) {
    const getInfo = await fetch(url, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => list.push(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }
  return list
}


function handleNext() {
  let newParams = { ...params };
  if (newParams.page) {
    newParams.page = +newParams.page + 1;
  } else {
    newParams.page = "2";
  }
  const newLink = new URLSearchParams(newParams).toString();
  window.location.href = splitLink[0] + "?" + newLink;
}

function handlePrev() {
  let newParams = { ...params };
  if (newParams.page && +newParams.page > 1) {
    newParams.page = +newParams.page - 1;
    const newLink = new URLSearchParams(newParams).toString();
    window.location.href = splitLink[0] + "?" + newLink;
  }
}