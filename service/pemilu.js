const fetch = require('node-fetch');

export const checkPemilu = async () => {
  return new Promise((resolve, reject) => {
    fetch('https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'id,en-US;q=0.9,en;q=0.8,fr;q=0.7',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Origin: 'https://pemilu2024.kpu.go.id',
        Pragma: 'no-cache',
        Referer: 'https://pemilu2024.kpu.go.id/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'sec-ch-ua':
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
};
