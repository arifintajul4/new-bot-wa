// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const { checkPemilu } = require('./service/pemilu');
const { imageToSticker } = require('./service/sticker');
const { dataURLtoFile } = require('./service/common');
const fs = require('fs');
const mime = require('mime-types');

console.clear();
venom
  .create({
    session: 'session-name', //name of session
    updatesLog: false,
    disableWelcome: true,
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    //prevent spam, command must be delayed 3 second after previous command
    if (message.body === '.sticker' || message.body === '.sirekap') {
      const lastCommand = new Date().getTime();
      if (lastCommand - message.timestamp < 3000) {
        client.sendText(
          message.from,
          'Mohon tunggu 3 detik sebelum menggunakan perintah lain'
        );
        return;
      }
    }

    if (message.body === '.help') {
      client.sendText(
        message.from,
        `Halo, berikut adalah beberapa perintah yang bisa kamu gunakan:
- .bot : untuk mengetes bot
- .sirekap : untuk melihat hasil pemilu
- .author : untuk melihat author dari bot ini
- .help : untuk melihat perintah yang bisa digunakan
`
      );
    }

    if (message.body === '.bot') {
      client.sendText(message.from, 'Welcome Venom 🕷');
    }

    if (message.body === '.sirekap') {
      client
        .sendText(message.from, 'Baik, mohon tunggu sebentar...')
        .then(() => {
          checkPemilu()
            .then((res) => {
              const { data } = res;
              const paslon = `Sirekap - ${data?.timestamp}\n
1. ${data?.paslon['1'].percentage}% - ${data?.paslon['1'].name} 

2. ${data?.paslon['2'].percentage}% - ${data?.paslon['2'].name}

3. ${data?.paslon['3'].percentage}% - ${data?.paslon['3'].name}

${data?.progress?.description} - ${data?.progress?.percentage}%
sumber: https://pemilu2024.kpu.go.id
        `;
              client.sendText(message.from, paslon);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }

    if (message.body === '.author') {
      client.sendText(
        message.from,
        `Bot ini dibuat oleh @arifintajul4. Untuk melihat kode sumber, silahkan kunjungi https://github.com/arifintajul4/new-bot-wa`
      );
    }

    if (
      message.type === 'image' &&
      (message.caption === '.sticker' ||
        message.caption === '.stiker' ||
        message.caption === '.s')
    ) {
      const buffer = await client.decryptFile(message);
      const fileName = `sticker.${mime.extension(message.mimetype)}`;
      await fs.writeFile(fileName, buffer, async (err) => {
        if (err) console.log(err);
        console.log('The file has been saved!');
        await client
          .sendImageAsSticker(message.from, `./${fileName}`)
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
}
