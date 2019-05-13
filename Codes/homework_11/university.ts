function logging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
      console.log("wrapper function: before invoking " + propertyKey);
      let result = originalMethod.apply(this, args);
      console.log("wrapped function: after invoking " + propertyKey);
      return result;
  }
}



export class University {
  name:string;
  dept:string;

  constructor(n:string, d:string) {
    this.name = n;
    this.dept = d;
  }

  @logging
  graduation(year:number):void {
    console.log(`Graduating ${this.dept} ${year} students`);
  }
}
