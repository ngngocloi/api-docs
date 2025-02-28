const https = require('https');
const fs = require('fs');

const imageUrl = 'https://storage.googleapis.com/pai-images/5ddd63955156492197e5636fd1003bde.png';
const localPath = './image.png';

https.get(imageUrl, (res) => {

  const filePath = fs.createWriteStream(localPath);
  res.pipe(filePath);

  filePath.on('finish',() => {
    filePath.close();  
    console.log('Image saved');
  });

});