import { OnInit, Directive, Input, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[isVisible]'
})
export class IsVisibleDirective {
  @Input() isVisible: string;
  constructor(private el: ElementRef, private renderer2:Renderer2) {

  }

  ngOnInit() {
    console.log(this.isVisible);
    if(this.isVisible) {
      this.renderer2.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer2.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

}
