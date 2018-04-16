var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apateez');

var storeSchema = mongoose.Schema({
  place_id: {
    type: String,
    unique: true
  },
  reviews: [
    []
  ],
  rating: Number
});

var Store = mongoose.model('Store', storeSchema);

var findAll = (callback) => {
  // console.log('findall triggered')
   return Store.find({}).sort({createdAt: -1});
}

var findOne = (id, callback) => {
  // console.log('find one db triggered with ', id)
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
