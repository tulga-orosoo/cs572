const EventEmitter = require('events');

class Gym extends EventEmitter {}

const myGym = new Gym();

myGym.on('boom', () => {
  console.log("Athlete is working out");
});

setInterval(() => { myGym.emit('boom') }, 1000);