
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4100;

const server = http.createServer((req, res) => {

  let filePath;
  let contentType;

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
    contentType = "text/html";

  } else if (req.url === "/index.html") {
    filePath = path.join(__dirname, "index.html");
    contentType = "text/plain";

  }else if (req.url === "/style.css") {
    filePath = path.join(__dirname, "style.css");
    contentType = "text/css";

  } else if (req.url === "/sample.txt") {
    filePath = path.join(__dirname, "sample.txt");
    contentType = "text/plain";

  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });

    return res.end("404 - Page Not Found");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain"
      });

      return res.end("Error loading file");
    }

    res.writeHead(200, {
      "Content-Type": contentType
    });

    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
