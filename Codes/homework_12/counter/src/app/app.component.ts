import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counterValues = [1,2,3,4];

  changeCounterValue(counter:number, ind:number) {
    this.counterValues[ind] = counter;
    console.log("Component counter " + (ind + 1) + " value changed!");
  }
}
