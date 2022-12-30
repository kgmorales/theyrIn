import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MovieDb } from 'moviedb-promise';
import bodyParser from 'body-parser';

const app = express();
dotenv.config({ path: '.env' });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const moviedb = new MovieDb(process.env.API_KEY);

const findMovie = async title =>
  await moviedb
    .searchMovie(title)
    .then(res => res)
    .catch(err => console.error(err));

const getSimilar = async id =>
  await moviedb
    .movieSimilar(id)
    .then(res => res)
    .catch(err => console.error(err));

app.post('/findMovie', async (req, res) => res.send(await findMovie(req.body.title)));

app.post('/getSimilar', async (req, res) => res.send(await getSimilar(req.body.movieId)));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
