// setTimeout(function() {console.log("world");}, 2000);

// console.log("Hello ");

// const http = require('http');

// http.createServer(function(req, res) {
//   res.writeHead(200, {''})
// }) 



Array.prototype.even = function() {
  const result = this.filter(x => x%2 == 0);
  setImmediate(() => {console.log(result)});
}

Array.prototype.odd = function() {
  const result = this.filter(x => x%2 == 1);
  setImmediate(() => {console.log(result)});
}



console.log('start');
[1,2,3,4,5,6,7,8].even();
[1,2,3,4,5,6,7,8].odd();
console.log('end');
