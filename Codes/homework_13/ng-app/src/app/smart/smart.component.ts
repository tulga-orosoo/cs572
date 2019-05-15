import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart',
  template: `
    <div>
      Total utilities:
      <ol>
      <app-dumb *ngFor="let util of utils" [util]="util"></app-dumb>
      </ol>
    </div>
  `,
  styles: []
})
export class SmartComponent implements OnInit {
  public utils:string[] = ['Notebook', 'Mouse', 'Keyboard', 'Monitor', 'Cooler', 'desktop'];
  constructor() { }

  ngOnInit() {
  }

}
