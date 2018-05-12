const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const redis = require('redis');

const client = redis.createClient();

const app = express();
app.locals.newrelic = newrelic;

client.on('connect', () => console.log('Redis connected'));
client.on('error', error => console.log('Error connecting to Redis', error));

const port = process.env.PORT || 3003;
const Stores = require('./../db/models/store.js'); // MONGO
// const pg = require('./../db/pg_server.js'); // PSQL

const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/restaurants', express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/restaurants/:id', (req, res) => {
  const place_id = req.params.id;

  /************************** MONGO QUERIES **************************/

  Stores.findOne(place_id)
    .then(data => res.send(data[0]))
    .catch(error => res.send(error));

  /************************** POSTGRES QUERIES **************************/
  // let result;

  // pg.getDescription(place_id)
  //   .then(data => result = data.rows[0])
  //   .then(() =>
  //     pg.getReviews(place_id)
  //       .then(data => {
  //         let reviews = []
  //         data.rows.forEach(review => reviews.push([review]))
  //         result.reviews = reviews;
  //         res.send(result)
  //       })
  //       .catch(err => res.send(err))
  //   )
});

app.listen(port, () => {
  console.log(`server running at PORT: ${port}`);
});
