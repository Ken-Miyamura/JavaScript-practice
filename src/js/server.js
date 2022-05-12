const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    let url = request.url;
    console.log(url);
    if ('/' === url) {
        fs.readFile('src/index.html','utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            }
        });
    } else if ('/css/main.css' === url) {
        fs.readFile('src/css/main.css', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            }
        })
    } else if ('/js/index.js' === url) {
        fs.readFile('src/js/index.js', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }
        });
    } else if ('/js/obj.js' === url) {
        fs.readFile('src/js/obj.js', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }
        });
    } else if ('/js/map_set.js' === url) {
        fs.readFile('src/js/map_set.js', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }
        });
    } else if ('/js/iterator_generator.js' === url) {
        fs.readFile('src/js/iterator_generator.js', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }
        });
    } else if ('/js/ajax.js' === url) {
        fs.readFile('src/js/ajax.js', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }
        });
    } else if ('/js/asynchronous.js' === url) {
        fs.readFile('src/js/asynchronous.js', 'utf-8', (err, data) => {
            if(err) {
                console.log(err.message);
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }
        });
    }
});

server.listen(8080);