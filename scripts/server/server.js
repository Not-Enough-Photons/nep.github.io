const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(`Requested resource: ${request.url}`);

    handleFileRequest(request.url, response);
});

server.listen(3000, 'localhost', () => {});

function loadFile(path, contentType, response) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type' : contentType });
            response.write(data);
            response.end();
        }
    });
}

function handleFileRequest(requestedURL, response) {
    let filePath = requestedURL.slice(0, 0) + '.' + requestedURL;
    let mimeType = '';
    
    if (requestedURL.endsWith('.html')) {
        mimeType = 'text/html';
    }
    else if (requestedURL.endsWith('.css')) {
        mimeType = 'text/css';
    }
    else if (requestedURL.endsWith('.json')) {
        mimeType = 'application/json';
    }
    else if (requestedURL.endsWith('.webm')) {
        mimeType = 'video/webm';
    }
    else if (requestedURL.endsWith('.png')) {
        mimeType = 'image/png';
    }
    else if (requestedURL.endsWith('woff2')) {
        mimeType = 'font/woff2';
    }

    loadFile(filePath.toString(), mimeType, response);
}