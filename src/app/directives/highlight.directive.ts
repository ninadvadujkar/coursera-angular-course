import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  @HostListener('mouseenter')
  onmouseenter() {
    this._renderer.addClass(this._el.nativeElement, 'highlight');
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this._renderer.removeClass(this._el.nativeElement, 'highlight');
  }

}
