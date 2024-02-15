// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const { checkPemilu } = require('./service/pemilu');

venom
  .create({
    session: 'session-name', //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === '.bot') {
      client.sendText(message.from, 'Welcome Venom 🕷');
    }
    if (message.body === '.sirekap') {
      checkPemilu()
        .then((res) => {
          const { data } = res;
          const paslon = `Sirekap - ${data?.timestamp}\n
1. ${data?.paslon['1'].percentage}% - ${data?.paslon['1'].name} 

2. ${data?.paslon['2'].percentage}% - ${data?.paslon['2'].name}

3. ${data?.paslon['3'].percentage}% - ${data?.paslon['3'].name}

${data?.progress?.description} - ${data?.progress?.percentage}%
        `;
          client.sendText(message.from, paslon);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
