const http = require('http');
const fs = require('fs');
const path = require('path');

const server1 = http.createServer((req, res) => {
    const file = fs.readFileSync(path.join(__dirname, 'big_file_53MB.zip'));
    res.end(file);
}).listen(3001, () => console.log("Server is listening on 3001 port"));

const server2 = http.createServer(function(req, res) {
  const rs = fs.createReadStream(path.join(__dirname, 'big_file_53MB.zip')).pipe(res);
}).listen(3002, () => console.log("Server is listening on 3002 port"));

const server3 = http.createServer(function(req, res) {
  const rs = fs.readFile(path.join(__dirname, 'big_file_53MB.zip'), (err, file) => {
    if (err) {
      console.error(err);
      res.end();
    } else {
      res.end(file);
    }
  });;
}).listen(3003, () => console.log("Server is listening on 3003 port"));



