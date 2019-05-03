// (() => new Promise((resolve) => resolve('promise')))()
// .then((p) => console.log(p))
// setTimeout(() => console.log('timeout'), 0);
// setImmediate(() => console.log('immediate'));
// queueMicrotask(() => console.log('microtask'));
// process.nextTick(() => console.log('nexttick'));



// (() => new Promise((resolve) => resolve('promise')))()
// .then((p) => console.log(p))
// queueMicrotask(() => console.log('microtask'));
// setImmediate(() => console.log('immediate'));
// setTimeout(() => console.log('timeout'), 0);
// process.nextTick(() => console.log('nexttick'));




const fs = require('fs');
fs.readFile(__filename, () => {
setTimeout(() => {
console.log('timeout');
}, 0);
setImmediate(() => {
console.log('immediate');
});
});