function generateRandomMovie() {
  const imdbId = document.getElementById("imdbId").value;
  const apiUrl = `/api/randomMovie?imdbId=${imdbId}`;

  // Simulate fetching the CSV file (replace with actual fetch call)
  // For security reasons, you may need a server-side component to fetch the CSV
  fetch(apiUrl)
    .then((response) => response.json())
    .then((movieDetails) => {
      displayResult(movieDetails);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayResult("Error fetching data. Please try again.");
    });
}

function displayResult(movieDetails) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `
        <p>Title: ${movieDetails.title}</p>
        <p>Genre: ${movieDetails.genre}</p>
        <p>Duration: ${movieDetails.duration} minutes</p>
        <p>Year: ${movieDetails.year}</p>
        <img src="${movieDetails.poster}" alt="${movieDetails.title} Poster" width="200">
    `;
}
