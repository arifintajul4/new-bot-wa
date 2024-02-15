const fs = require('fs');

async function dataURLtoFile(dataurl, filename) {
  return new Promise((resolve, reject) => {
    var bstr = Buffer.from(dataurl.split(',')[1], 'base64');

    fs.writeFile(filename, bstr, (err) => {
      if (err) reject(err);
      resolve(filename);
    });
  });
}

module.exports = {
  dataURLtoFile,
};
