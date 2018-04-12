var fullList = require('.//fullList.json')
var Stores = require('.//db/models/store.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apateez');

var seedDb = (array) => {
  let counter = 0

  var createList = () => {

    var obj = {
      place_id: array[counter].place_id,
      reviews: array[counter].reviews,
      rating: array[counter].rating
    }
    console.log

    Stores.insertOne(obj, (err, content) => {
      if (err) {
        console.log("ERROR IS", err)
      } else {
        console.log('CONTENT is ', content)
        counter++;
        if (counter < array.length) {
          createList()
        } else {
          console.log(array.length)
          mongoose.disconnect();
        }
      }
    })
  }

  Stores.clearDb(() => createList())
}

seedDb(fullList)
