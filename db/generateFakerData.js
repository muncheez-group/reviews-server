const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const stream = fs.createWriteStream('./fakerData.json');

// SHAPE OF DATA
// [
//   { 
//   result:
//     { address_components: [
//       {},
//       {long_name: string}, STREET
//       {long_name: string}, NEIGHBORHOOD
//       {long_name: string}, CITY
//     ],
//       place_id: number,
//       name: string,
//       reviews: 
//       [
//         {
//           author_name: string,
//           profile_photo_url: string,
//           rating: number,
//           relative_time_description: string,
//           text: string,
//         }
//       ],
//     }
//   }
// ]

var count = 0;

const getRandomNum = function() {
  var min = 1;
  var max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateReviews = function() {
  var reviews = [];
  for (var i = 0; i < getRandomNum(); i++) {
    reviews.push(
      {
        author_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        profile_photo_url: `https://www.muncheez.com/images/${faker.random.number(100)}.jpg`,
        rating: faker.finance.amount(1, 5, 2),
        relative_time_description: moment(faker.date.past(1)).startOf('month').fromNow(),
        text: faker.lorem.paragraphs(),
      }
    )
  }
  return reviews; 
}

const generateAddress = function() {
  var address = [
    {},
    { long_name: faker.address.streetName() },
    { long_name: faker.address.county() },
    { long_name: faker.address.city() },
  ]
  return address; 
}

const generateData = () => {
  var data = {};
  data.result = {
    address_components: generateAddress(),
    place_id: count++,
    name: faker.company.companyName(),
    rating: faker.finance.amount(1, 5, 2),
    price_level: faker.random.number({ min: 1, max: 4 }),
    reviews: generateReviews(),
  };
  return data;
}

stream.write("[");

var j = 0;

const writeFakerData = function () {
  while (j < 5) {
    stream.write(JSON.stringify(generateData()));
  
    if (j !== 4) {
      stream.write(',');
    }
    j++;
  }
}

stream.on('drain', function() {
  writeFakerData();
});

writeFakerData();

stream.write("]");

stream.end();
