import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MovieDb } from 'moviedb-promise';
import bodyParser from 'body-parser';

const app = express();
dotenv.config({ path: '.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const moviedb = new MovieDb(process.env.API_KEY);
const getImage = async id => await moviedb.movieImages(id);

const findMovie = async title =>
  await moviedb
    .searchMovie(title)
    .then(res => getImage(res.results[0].id))
    .catch(err => console.log(err));

app.post('/findMovie', async (req, res) => res.send(await findMovie(req.body.title)));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
