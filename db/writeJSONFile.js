const fs = require('fs');
const generateData = require('./generateFakerData.js');

const stream = fs.createWriteStream('./fakerData.json');

stream.write('[');

const writeTenMillionTimes = () => {
  let i = 100;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
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
      // had to stop early!
      // write some more once it drains
      stream.once('drain', write);
    }
  }
  write();
};

writeTenMillionTimes();
