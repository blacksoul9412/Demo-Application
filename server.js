// File: server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML page
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/greet') {
    // Handle form submission
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const name = decodeURIComponent(body.split('=')[1]);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Hello, ${name}!\n`);
    });
  } else {
    // Handle other requests with a 404 response
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
