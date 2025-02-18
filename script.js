const API_KEY = "4aa5776ef3fdc9d6ee9a7b8815055984";
const API_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=fr`;

const films = document.querySelectorAll(".film");
const searchInput = document.getElementById("search");
const catalogue = document.getElementById("catalogue");

async function fetchMovies() {
    const response = await fetch(API_URL);
    const data = await response.json();
    films = data.results;
    displayMovies(films);
}

function displayMovies(filmsList) {
    catalogue.innerHTML = "";
    filmsList.forEach(film => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("film");
        filmElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title || film.name}">
            <p>${film.title || film.name}</p>
        `;
        filmElement.addEventListener("click", () => {
            window.location.href = `details.html?id=${film.id}&type=${film.media_type}`;
        });
        catalogue.appendChild(filmElement);
    });
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    films.forEach(film => {
        const title = film.querySelector("p").innerText.toLowerCase();

        // Si le champ de recherche est vide, afficher tout
        if (searchTerm === "") {
            film.style.display = "block";
        } else {
            // Vérifier si le titre contient le texte recherché
            film.style.display = title.includes(searchTerm) ? "block" : "none";
        }
    });
});

fetchMovies();