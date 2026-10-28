const fs = require('fs');

const content = "Learning Node.js is exciting!Learning Node.js is exciting!Learning Node.js is exciting!Learning Node.js is exciting!Learning Node.js is exciting!Learning Node.js is exciting!Learning Node.js is exciting!Learning Node.js is exciting!";

fs.writeFile('output.txt', content, (err) => {
    if (err) throw err;
    console.log('File has been saved!');
});