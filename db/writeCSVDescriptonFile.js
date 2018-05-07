const fs = require('fs');
const { generateDescription } = require('./generateCSVData.js');

const stream = fs.createWriteStream('./data/descriptions.csv');
const header = 'place_id,name,price_level,neighborhood,city,street,rating\n';

stream.write(header);

const writeTenMillionTimes = () => {
  let i = 10e6;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        stream.write(generateDescription(), 'utf-8', () => {
          stream.end();
        });
      } else {
        ok = stream.write(generateDescription(), 'utf-8');
        stream.write('\n');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stream.once('drain', write);
    }
  }
  write();
};

writeTenMillionTimes();
