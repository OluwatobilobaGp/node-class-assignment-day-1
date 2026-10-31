const fs = require('node:fs');

fs.unlink('to-do-delete.txt', (err) => {
  if (err) console.error("Could not delete file:", err);
  else console.log("File deleted successfully.");
});