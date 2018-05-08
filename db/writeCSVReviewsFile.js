const fs = require('fs');
const { generateReviews } = require('./generateCSVData.js');

const stream = fs.createWriteStream('./data/reviews.csv');
const header = 'place_id,author_name,profile_photo_url,rating,relative_time_description,text\n';

stream.write(header);

const writeTenMillionTimes = () => {
  let i = 10e6;
  let j = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        stream.write(generateReviews(j), 'utf-8', () => {
          stream.end();
        });
      } else {
        ok = stream.write(generateReviews(j), 'utf-8');
      }
      j += 1;
    } while (i > 0 && ok);
    if (i > 0) {
      stream.once('drain', write);
    }
  }
  write();
};

writeTenMillionTimes();
