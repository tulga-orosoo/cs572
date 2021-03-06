
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

let promise = "This house is nice!".filterWords(['house', 'nice']);
let result = /*await*/ promise;
console.log(result);


const {Observable} = rxjs;

String.prototype.filterWords = function(strArray) {
  let originalStr = this.valueOf();
  return Observable.create(function(observer) {
    strArray.map(str => originalStr = originalStr.replace(str, "***"));
    observer.next(originalStr);
    setTimeout(() => { observer.complete(); }, 2000);
  });
}

const subscriptin = "This house is nice!".filterWords(['house', 'nice']).subscribe(
  function(x) {console.log(x)},
  function(err) {console.log(err)},
  function() {console.log("Observable done!")},
)




function isWeekend() {
  const todayDate = new Date();
  const day = todayDate.getDay();
  const daysName = ['weekend', 'weekday', 'weekday', 'weekday', 'weekday', 'weekday', 'weekend'];
  return daysName[day];
}

console.log(isWeekend());

function applyCoupon(item) {
  return function(ammount) {
    item.price -= ammount;
    return item;
  }
}

const item = {
  "name": "Avocado",
  "type": "Fruit",
  "category": "Food",
  "price": 200
}

console.log(applyCoupon(item)(20).price === 180);




sayHi(); 
function sayHi() {console.log("Hi")}


sayHi(); 
var sayHi = function() {console.log("Hi")}