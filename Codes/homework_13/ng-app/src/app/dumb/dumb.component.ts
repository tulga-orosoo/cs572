import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-dumb',
  template: `
    <li>
      {{util}}
    </li>
  `,
  styles: []
})
export class DumbComponent implements OnInit {
  @Input() util:string
  constructor() { }

  ngOnInit() {
  }

}
