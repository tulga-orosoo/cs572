const os = require('os');
const {Observable} = require('rxjs');
const consoleColor = "\x1b[33m%s\x1b[0m";

const log = (msg) => {
  console.log(consoleColor, msg);
}

const checkStatus = function() {
  return Observable.create(function(observer) {
    const cpu = os.cpus();
    const mem = os.freemem();
    const minMemor = 2 * 1024 * 1024 * 1024;
    const minCore = 2;

    log("Checking your system...");
    
    observer.next("System free memory : " + Math.round(mem/1024/1024/1024*100)/100 + 'GB');
    observer.next("System cpu cores: " + cpu.length);

    if(mem < minMemor) {
      observer.error("This app needs at least 2 GB of RAM");
    }

    if(cpu < minCore) {
      observer.error("Processor is not supported");
    }
    
    observer.complete();
  });
}

module.exports = {checkStatus: checkStatus};
