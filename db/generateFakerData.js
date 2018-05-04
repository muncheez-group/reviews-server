const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const stream = fs.createWriteStream('./fakerData.json');


const getRandomNum = function() {
  var min = 1;
  var max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateReviews = function() {
  var reviews = [];
  for (var i = 0; i < getRandomNum(); i++) {
    reviews.push(
      {
        author_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        profile_photo_url: `https://www.muncheez.com/images/${faker.random.number(70)}.jpg`,
        rating: faker.finance.amount(1, 5, 2),
        relative_time_description: moment(faker.date.past(1)).startOf('month').fromNow(),
        text: faker.lorem.paragraph(),
      }
    )
  }
  return reviews; 
}

var count = 0;

const generateData = () => {
  var data = {
    place_id: count++,
    name: faker.company.companyName(),
    price_level: faker.random.number({ min: 1, max: 4 }),
    neighborhood: faker.address.county(),
    city: faker.address.city(),
    street: faker.address.streetName(),
    rating: faker.finance.amount(1, 5, 2),
    reviews: generateReviews(),
  };
  return JSON.stringify(data);
}

stream.write("[");

function writeTenMillionTimes() {
  let i = 10e6;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        stream.write(generateData(), 'utf-8', () => {
          stream.write("]");
          stream.end();
        });
      } else {
        ok = stream.write(generateData(), 'utf-8');
        stream.write(',');

        if (i % 500000 === 0) {
          console.log(i)
        }
        
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      stream.once('drain', write);
    }
  }
}

writeTenMillionTimes();
