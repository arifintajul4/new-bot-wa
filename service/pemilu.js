const fetch = require('node-fetch');

const checkPemilu = async () => {
  return new Promise((resolve, reject) => {
    fetch('https://sirekap-kpu.heirro.dev/')
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// const main = async () => {
//   checkPemilu().then((res) => {
//     const { data } = res;
//     const paslon = `Sirekap - ${data?.timestamp}\n

// 1. ${data?.paslon['1'].name} - ${data?.paslon['1'].percentage}%
// 2. ${data?.paslon['2'].name} - ${data?.paslon['2'].percentage}%
// 3. ${data?.paslon['3'].name} - ${data?.paslon['3'].percentage}%

// ${data?.progress?.description}
//     `;
//     console.log(paslon);
//   });
// };

// main();

module.exports = {
  checkPemilu,
};
