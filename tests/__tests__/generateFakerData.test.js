const generateFakerData = require('../../db/generateFakerData');

const data = JSON.parse(generateFakerData());

describe('Faker Data Generator', () => {

  test('should generate fake data with appropriate value types', () => {
    expect(typeof data).toBe('object');
    expect(typeof data.name).toBe('string');
    expect(typeof data.price_level).toBe('number'); 
    expect(typeof data.neighborhood).toBe('string');
    expect(typeof data.city).toBe('string');
    expect(typeof data.street).toBe('string');
    expect(typeof data.rating).toBe('number'); 
    expect(Array.isArray(data.reviews)).toBe(true); 
  });

  test('price_level should be an integer before 1 and 4, inclusive', () => {
    expect(data.price_level).toBeGreaterThanOrEqual(1); 
    expect(data.price_level).toBeLessThanOrEqual(4); 
  });

  test('rating should be an integer before 1 and 4, inclusive', () => {
    expect(data.rating).toBeGreaterThanOrEqual(1); 
    expect(data.rating).toBeLessThanOrEqual(5); 
  });
});
