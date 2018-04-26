var fullList = require('./195-Zagat-AllData.json')
var Stores = require('./db/models/store.js');
var mongoose = require('mongoose');

// var mongoUrlDocker = 'mongodb://database/apateez-reviews';
// var mongoUrl = 'mongodb://localhost/apateez-reviews';
//
// mongoose.connect(mongoUrl);
// // mongoose.connect(mongoUrlDocker);

var seedDb = (array) => {
  let counter = 0

  var createList = () => {

    var obj = {
      place_id: array[counter].result.place_id,
      name: array[counter].result.name,
      reviews: array[counter].result.reviews,
      rating: array[counter].result.rating,
      price_level: array[counter].result.price_level,
      neighborhood: array[counter].result.address_components[2].long_name,
      city: array[counter].result.address_components[3].long_name,
      street: array[counter].result.address_components[1].long_name
    }


    Stores.insertOne(obj, (err, content) => {
      if (err) {
        console.log("ERROR IS", err)
      } else {
        console.log('CONTENT is ', content)
        console.log('array.length is ', array.length)
        console.log('counter is ', counter)
        counter++;
        if (counter < array.length) {
          createList()
        } else {
          console.log(array.length)
          console.log('counter is ', counter)
          mongoose.disconnect();
        }
      }
    })
  }

  Stores.clearDb(() => createList())
}

seedDb(fullList)
