const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const imdbId = req.query.imdbId;
    const apiUrl = `https://www.imdb.com/list/${imdbId}/export`;

    // Simulate fetching the CSV file (replace with actual fetch call)
    // For security reasons, you may need a server-side component to fetch the CSV
    const response = await fetch(apiUrl);
    const csvData = await response.text();

    // Parse CSV data and extract movie titles
    const movieTitles = parseCsvAndGetTitles(csvData);

    // Randomly select a movie title
    const randomMovieTitle = getRandomMovieTitle(movieTitles);

    // Use TMDb API to get movie details
    const movieDetails = await getMovieDetails(randomMovieTitle);

    res.status(200).json(movieDetails);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function parseCsvAndGetTitles(csvData) {
  // Implement your logic to parse CSV and extract movie titles
  // For simplicity, let's assume the CSV has one column with movie titles
  const lines = csvData.split("\n");
  return lines.map((line) => line.trim());
}

function getRandomMovieTitle(movieTitles) {
  // Implement logic to get a random movie title from the array
  const randomIndex = Math.floor(Math.random() * movieTitles.length);
  return movieTitles[randomIndex];
}

async function getMovieDetails(movieTitle) {
  const apiKey = process.env.173537552a9e1f2c8508e0ebd5f06015; // Use environment variable for security
  const tmdbApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    movieTitle
  )}`;

  const response = await fetch(tmdbApiUrl);
  const data = await response.json();

  // Extract relevant movie details (you may need to adapt this based on TMDb response structure)
  const movieDetails = {
    title: data.results[0].title,
    genre: data.results[0].genres.map((genre) => genre.name).join(", "),
    duration: data.results[0].runtime,
    year: data.results[0].release_date.substring(0, 4),
    poster: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
  };

  return movieDetails;
}
