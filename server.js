const express = require('express');
const axios = require('axios');
const csv = require('csv-parser');
const random = require('random');
const app = express();
const port = process.env.PORT || 3000; // Utilizza la porta fornita da Vercel o usa la 3000 di default

const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.get('/random-movie/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: 'ID di IMDb non fornito' });
    }

    const imdbUrl = `https://www.imdb.com/list/${userId}/export`;

    try {
        const response = await axios.get(imdbUrl);
        if (response.status !== 200) {
            throw new Error(`Errore durante la richiesta IMDb: ${response.statusText}`);
        }

        const titles = [];
        response.data
            .pipe(csv())
            .on('data', (row) => {
                titles.push(row['Title']);
            })
            .on('end', async () => {
                if (titles.length === 0) {
                    return res.status(404).json({ error: 'Nessun film trovato nella watchlist di IMDb' });
                }

                const randomTitle = random.arrayElement(titles);

                const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: { api_key: TMDB_API_KEY, query: randomTitle }
                });

                return res.json(tmdbResponse.data.results[0]);
            });
    } catch (error) {
        return res.status(500).json({ error: `Errore durante la richiesta IMDb: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
