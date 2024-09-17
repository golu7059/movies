const BASE_URL = `https://golu-movies-virid.vercel.app/api/movies`;

const app = document.querySelector(".app");
const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const emptyContainer = document.querySelector(".empty");
const loading = document.getElementById("loading");

let debounceTimeout;

const searchMovies = async (title) => {
  try {
    loading.style.display = "block";  // Show loading spinner
    emptyContainer.style.display = "none";  // Hide 'No Movies Found'

    const movieResponse = await fetch(`${BASE_URL}?title=${title}`);
    const movies = await movieResponse.json();
    loading.style.display = "none";  // Hide loading spinner

    if (movies.length === 0) {
      emptyContainer.style.display = "block";  // Show 'No Movies Found' if no movies
      document.querySelector(".container")?.remove(); // Remove previous movie results
    } else {
      displayMovies(movies);
    }
  } catch (error) {
    loading.style.display = "none";  // Hide loading on error
    console.error("Error fetching movies:", error);
  }
};

const displayMovies = (movies) => {
  document.querySelector(".container")?.remove(); // Remove previous movie results

  const movieContainer = document.createElement("div");
  movieContainer.classList.add("container");

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title} (${movie.Year})</h3>
      <p>Genre: ${movie.Genre || "N/A"}</p>
      <p>Rating: ${movie.imdbRating || "N/A"}/10</p>
      <p>${movie.Plot || "No plot available"}</p>
    `;

    movieCard.addEventListener("click", () => {
      window.location.href = `https://www.imdb.com/title/${movie.imdbID}/`;
    });

    movieContainer.appendChild(movieCard);
  });

  app.appendChild(movieContainer);
};

// Debounce for search input
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const title = searchInput.value.trim();
    if (title !== "") {
      searchMovies(title);
    }
  }, 500);
});

searchIcon.addEventListener("click", () => {
  const title = searchInput.value.trim();
  if (title !== "") {
    searchMovies(title);
  }
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
