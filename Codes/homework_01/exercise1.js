

// String.prototype.filterWords = function(strArray) {
//   return this.valueOf().split(' ').map(str => {
//     if(strArray.indexOf(str) > -1) {
//       return (new Array(str.length)).join("*");
//     }
//     return str;
//   }).reduce((x, y) => x + ' ' + y);
// }

// console.log("This house is nice!".filterWords(['house', 'nice']));


String.prototype.filterWords = function(strArray) {
  let originalStr = this.valueOf();
  strArray.map(str => originalStr = originalStr.replace(str, "***"));
  return originalStr;
}

console.log("This house is nice!".filterWords(['house', 'nice']));


String.prototype.filterWords = function(strArray) {
  let originalStr = this.valueOf();
  return new Promise(function(resolve, reject) {
    strArray.map(str => originalStr = originalStr.replace(str, "***"));
    resolve(originalStr);
  });
}

"This house is nice!".filterWords(['house', 'nice']).then(result => console.log(result));



String.prototype.filterWords = async function(strArray) {
  let originalStr = this.valueOf();
  return new Promise(function(resolve, reject) {
    strArray.map(str => originalStr = originalStr.replace(str, "***"));
    resolve(originalStr);
  });
}


console.log(await "This house is nice!".filterWords(['house', 'nice']));





String.prototype.filterWords = async function(strArray) {
  let originalStr = this.valueOf();
  return new Promise(function(resolve, reject) {
    strArray.map(str => originalStr = originalStr.replace(str, "***"));
    resolve(originalStr);
  });
}


console.log(await "This house is nice!".filterWords(['house', 'nice']));


