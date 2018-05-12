const { Pool } = require('pg');

const pool = new Pool({
  database: 'muncheez_restaurants',
});

const getReviews = (placeId) => {
  const q = `select * from reviews where place_id = ${placeId}`;
  return pool.query(q);
};

const getDescription = (placeId) => {
  const q = `select * from restaurants where place_id = ${placeId}`;
  return pool.query(q);
};

module.exports = {
  getReviews,
  getDescription,
}
