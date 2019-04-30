


/** 
 * 


======  Writing exercises ======

1.	What will be the order of execution between setImmediate(callback) and setTimeout(callback, 0)?

•	setImmediate() is designed to execute a script once current poll phase complete
•	setTimeout() schedules a script to be run after minimum threshold in ms has elapsed.
The order in which the timers are executed will vary depending on the context in which they are called. If both are called from within the main module, then timing will be bound by the performance of the process (which can be impacted by other applications running on the machine).

The main advantage to using setImmediate() over setTimeout() is setImmediate()will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.


2.	Explain the difference between process.nextTick and setImmediate? What will be execution order?
•	process.nextTick() fires immediately in same phase 
•	setImmediate() fires on the following iteration or ‘tick’ of the other loop

process.nextTick() fires more immediately than setImmediate() 

3.	Name 10 core modules that Node provides by default.

1.	Http
2.	Stream
3.	Process
4.	Timers
5.	Repl
6.	Path
7.	Events
8.	Domain
9.	Crypto
10.	Buffer

 **/






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
