const { generateDescription, generateReviews, generateReview } = require('../../db/generateCSVData.js');

const review = generateReview(0);
const reviews = generateReviews(0);
const description = generateDescription();

describe('CSV Faker Data Generator', () => {

  test('should generate a review', () => {
    expect(typeof review).toBe('string'); 
  });

  test('a review must have a place_id', () => {
    expect(review[0]).toBe('0'); 
  });

  test('should generate 1 to 6 reviews per restaurant', () => {
    expect(reviews.split('\n').length).toBeGreaterThanOrEqual(1); 
    expect(reviews.split('\n').length).toBeLessThanOrEqual(6); 
  });

  test('should generate a restaurant description', () => {
    expect(typeof description).toBe('string');
    expect(description.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)).toHaveLength(7);
  });

});
