const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3003;
const Stores = require('./../db/models/store.js');

const bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/restaurants', express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/api/restaurants/:id', function(req, res) {
  var place_id = req.params.id
  // console.log('place_id IS :', place_id)
  Stores.findOne(place_id)
  .then(function(data) {
    console.log('data ', data)
    res.send(data[0])
  })
})

app.listen(port, () => {
  console.log(`server running at PORT: ${port}`);
});
