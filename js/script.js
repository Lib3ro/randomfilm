// script.js

async function getRandomMovie() {
    try {
        const response = await fetch('{{BACKEND_URL}}/random-movie/ls566007104');
        const movieDetails = await response.json();
        displayMovieDetails(movieDetails);
    } catch (error) {
        console.error('Errore durante la richiesta al backend:', error);
    }
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Anno:</strong> ${movie.release_date}</p>
        <p><strong>Voto:</strong> ${movie.vote_average}</p>
        <p><strong>Descrizione:</strong> ${movie.overview}</p>
    `;
}
