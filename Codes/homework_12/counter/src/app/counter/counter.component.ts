import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input() counterValue:number = 0;
  @Output() onChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {

  }

  increment() {
    this.counterValue ++;
    this.onChange.emit(this.counterValue);
  }

  decrement() {
    if(this.counterValue > 0) {
      this.counterValue --;
      this.onChange.emit(this.counterValue);
    }
  }


}
