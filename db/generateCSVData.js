const faker = require('faker');
const moment = require('moment');


const generateReview = (place_id) => {
  let review = '';
  review += place_id + ',';
  review += faker.fake('{{name.firstName}} {{name.lastName}}') + ',';
  review += `https://www.muncheez.com/images/${faker.random.number(70)}.jpg` + ',';
  review += faker.random.number({ min: 1, max: 5 }) + ',';
  review += moment(faker.date.past(1)).startOf('month').fromNow() + ',';
  review += faker.lorem.paragraph();
  return review;
}

const generateReviews = (place_id) => {
  let reviews = '';
  for (let i  = 0; i < faker.random.number({ min: 1, max: 6 }); i += 1) {
    reviews += generateReview(place_id) + '\n';
  }
  place_id += 1;
  return reviews;
}

let count = 0;

const generateDescription = () => {
  let description = '';
  description += count + ',';
  description += `"${faker.company.companyName()}",`;
  description += faker.random.number({ min: 1, max: 4 }) + ',';
  description += faker.address.county() + ',';
  description += faker.address.city() + ',';
  description += faker.address.streetName() + ',';
  description += parseFloat(faker.finance.amount(1, 5, 1));
  count += 1;
  return description;
}

module.exports = { 
  generateDescription, 
  generateReviews,
  generateReview,
};