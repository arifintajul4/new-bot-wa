const { dataURLtoFile } = require('./common');
const path = require('path');

const imageToSticker = async (client, message) => {
  //   console.log(message);
  if (message.type === 'image' && message.caption === '.sticker') {
    // const mediaData = await client.decryptFile(message);
    const imageBase64 = `data:${message.mimetype};base64,${message.body}`;
    await dataURLtoFile(imageBase64, 'sticker.png');
    // console.log(filename);
    const rootFolder = path.resolve(__dirname, '..'); // Go up one level from the service folder
    const filename = path.join(rootFolder, 'sticker.png');
    console.log(filename);
    await client
      .sendImageAsSticker(message.from, '/sticker.png')
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = {
  imageToSticker,
};
