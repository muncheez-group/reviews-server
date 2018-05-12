const faker = require('faker');

function generateRandomNum(userContext, events, done) {
  // generate data with Faker:
  const id = faker.random.number(10e6);

  // add variables to virtual user's context:
  userContext.vars.id = id;
  // continue with executing the scenario:
  return done();
}

module.exports = { generateRandomNum };
