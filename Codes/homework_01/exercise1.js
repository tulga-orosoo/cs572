
String.prototype.filterWords = function(strArray) {
  let originalStr = this.valueOf();
  strArray.map(str => originalStr = originalStr.replace(str, (new Array(str.length)).join("*")));
  return originalStr;
}

console.log("This house is nice!".filterWords(['house', 'nice']));

String.prototype.filterWords = function(strArray) {
  return this.valueOf().split(' ').map(str => {
    if(strArray.indexOf(str) > -1) {
      return (new Array(str.length)).join("*");
    }
    return str;
  }).reduce((x, y) => x + ' ' + y);
}

console.log("This house is nice!".filterWords(['house', 'nice']));

String.prototype.filterWords = function(strArray) {
  const origin = this.valueOf();
  const promise = async new Promise(function(resolve, reject) {
    const result = origin.split(' ').map(str => {
      if(strArray.indexOf(str) > -1) {
        return (new Array(str.length)).join("*");
      }
      return str;
    }).reduce((x, y) => x + ' ' + y);
    resolve(result);
  });

  return await promise.then(function(x) {
    return x;
  });
}

console.log("This house is nice!".filterWords(['house', 'nice']));