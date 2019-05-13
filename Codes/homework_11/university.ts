export class University {
  name:string;
  dept:string;

  constructor(n:string, d:string) {
    this.name = n;
    this.dept = d;
  }

  graduation(year:number):void {
    console.log(`Graduating ${this.dept} ${year} students`);
  }
}