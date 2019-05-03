const {Observable} = require('rxjs');
const stat = require('./system_check');
const colorSuccess = "\x1b[32m%s\x1b[0m";
const colorError = "\x1b[31m%s\x1b[0m";

stat.checkStatus().subscribe(
  (status) => { console.info(status); },
  (error) => { console.error(colorError, error); },
  () => { console.log(colorSuccess, "System is checked successfully."); },
)


const fs = require('fs');

process.on('start', file => {
    console.log(file);
    process.send('24525');
});