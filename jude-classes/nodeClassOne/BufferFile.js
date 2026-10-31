const fs = require('node:fs');

const readStream = fs.createReadStream('tesing.mp4');
readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readStream.on('end', () => {
  console.log("Finished reading file.");
});