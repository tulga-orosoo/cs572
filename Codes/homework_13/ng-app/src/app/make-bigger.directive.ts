import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[makeBigger]'
})
export class MakeBiggerDirective {

  constructor(private el: ElementRef, private renderer2:Renderer2) {}

  @HostListener('dblclick') onDblClick() {
    let height = parseInt(this.el.nativeElement.style.height) + 10;
    let width = parseInt(this.el.nativeElement.style.width) + 10;
    this.renderer2.setStyle(this.el.nativeElement, "height", (height + 'px'));
    this.renderer2.setStyle(this.el.nativeElement, "width", (width + 'px'));
  }

}
