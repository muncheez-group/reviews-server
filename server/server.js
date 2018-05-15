const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const redis = require('redis');
const cluster = require('cluster');

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const client = redis.createClient();

  const app = express();
  app.locals.newrelic = newrelic;

  client.on('connect', () => console.log('Redis connected'));
  client.on('error', error => console.log('Error connecting to Redis', error));

  const port = process.env.PORT || 3003;
  const Stores = require('./../db/models/store.js'); // MONGO

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

    client.get(`place_id:${place_id}`, (err, reply) => {
      if (err) {
        return console.error(err);
      } else if (reply) {
        res.send(JSON.parse(reply));
      } else {
        Stores.findOne(place_id)
          .then(data => {
            client.set(`place_id:${place_id}`, JSON.stringify(data[0]))
            return res.send(data[0])
          })
          .catch(error => res.send(error));
      }
    });
  });

  app.listen(port, () => {
    console.log(`server running at PORT: ${port}`);
  });
}