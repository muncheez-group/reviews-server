var mongoose = require('mongoose');

var mongoUrlDocker = 'mongodb://database/apateez-reviews';
var mongoUrl = 'mongodb://localhost/apateez-reviews';

mongoose.connect(mongoUrlDocker);
// mongoose.connect(mongoUrlDocker);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open')
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
  mongoose.connect(mongoUrl)
});

var storeSchema = mongoose.Schema({
  place_id: {
    type: String,
    unique: true
  },
  name: String,
  price_level: Number,
  neighborhood: String,
  reviews: [
    []
  ],
  city: String,
  street: String,
  rating: Number
});

var Store = mongoose.model('Store', storeSchema);

var findAll = (callback) => {
  // console.log('findall triggered')
   return Store.find({}).sort({createdAt: -1});
}

var findOne = (id, callback) => {
  console.log('find one db triggered with ', id)
  return Store.find({ place_id: id}, callback);
}


var insertOne = (store, callback) => {
  // console.log('NEW STORE', store)
  Store.create(store, callback);
}

const clearDb = (cb) => {
  Store.remove({}, cb)
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.clearDb = clearDb;
