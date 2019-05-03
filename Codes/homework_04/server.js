const http = require('http');
const {Subject} = require('rxjs');
const url = require('url');
const {fork} = require('child_process');

subject = new Subject();
subject.subscribe(doParseFile);

http
    .createServer((req, res) => {
        subject.next({req, res});
    })
    .listen(4040)
    .on('listening', () => console.log("Open http://localhost:4040/ in your browser."));

function doParseFile({req, res}) {
    const query = url.parse(req.url, true).query;
    //replace with observable
    if (query == null) {
        req.end("File url is empty.");
        return;
    }

    const childProcess = fork('./read.file');
    childProcess.on("message", data => {
        res.end(data);
    });

    childProcess.send('start', query.url);
}