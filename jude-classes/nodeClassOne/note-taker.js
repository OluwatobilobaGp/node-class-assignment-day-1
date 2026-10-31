const fs = require('fs');
// process.argv[0] is the node path 
// process.argv[1] is the file path 
// process.argv[2+] are the custom arguments 
const fileName = process.argv[2];
const content = process.argv[3];

if (!fileName || !content) {
  console.log("Usage: node note-taker.js <filename> <content>");
} else {
  fs.writeFile(`${fileName}.txt`, content, (err) => {
    if (err) {
      console.error("Failed to save note:", err);
    } else {
      console.log(`Successfully created ${fileName}.txt!`);
    }
  });
}