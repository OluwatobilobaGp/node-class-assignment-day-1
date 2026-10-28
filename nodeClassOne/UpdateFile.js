const fs = require('node:fs');

fs.appendFile('log.txt', "\nAppending a new line.", (err) => {
    if (err) console.error(err);
    else console.log("Content appended.");
});