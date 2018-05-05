const fs = require('fs');
const generateData = require('./generateJSONData.js');

const stream = fs.createWriteStream('./data/fakerData.json');

stream.write('[');

const writeTenMillionTimes = () => {
  let i = 10e6;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        stream.write(generateData(), 'utf-8', () => {
          stream.write(']');
          stream.end();
        });
      } else {
        ok = stream.write(generateData(), 'utf-8');
        stream.write(',');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stream.once('drain', write);
    }
  }
  write();
};

writeTenMillionTimes();
