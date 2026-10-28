const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const htmlFilePath = path.join(__dirname, 'index.html');
const PORT = 5001;

const server = http.createServer(async (req, res) => {
	if (req.method !== 'GET' || req.url !== '/') {
		res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Page not found');
		return;
	}

	try {
		const html = await readFile(htmlFilePath, 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(html);
	} catch (error) {
		console.error('Unable to read the HTML file:', error);
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Unable to load the page');
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
