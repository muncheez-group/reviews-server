const faker = require('faker');
const moment = require('moment');

const getRandomNum = function () {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
};

const generateReviews = function () {
  const reviews = [];
  for (let i = 0; i < getRandomNum(); i += 1) {
    reviews.push({
      author_name: faker.fake('{{name.firstName}} {{name.lastName}}'),
      profile_photo_url: `https://www.muncheez.com/images/${faker.random.number(70)}.jpg`,
      rating: faker.random.number({ min: 1, max: 5 }),
      relative_time_description: moment(faker.date.past(1)).startOf('month').fromNow(),
      text: faker.lorem.paragraph(),
    });
  }
  return reviews;
};

let count = 0;

const generateData = () => {
  const data = {
    place_id: count,
    name: faker.company.companyName(),
    price_level: faker.random.number({ min: 1, max: 4 }),
    neighborhood: faker.address.county(),
    city: faker.address.city(),
    street: faker.address.streetName(),
    rating: parseFloat(faker.finance.amount(1, 5, 1)),
    reviews: generateReviews(),
  };
  count += 1;
  return JSON.stringify(data);
};

module.exports = generateData;
