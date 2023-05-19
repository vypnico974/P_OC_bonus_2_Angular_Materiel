import { AfterViewInit, Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

     @Input() color = 'yellow';
    //  @Input() highlight!: string; //dans ce cas, ne permet pas d'avoir une couleur par défait si non renseigné

  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  ngAfterViewInit() {
     this.setBackgroundColor(this.color);
   // this.setBackgroundColor(this.highlight);
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('lightgreen');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.color);
  }

  @HostListener('click') onClick() {
    this.color = 'lightgreen';
  }
}

// import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

// @Directive({
//   selector: '[highlight]'
// })
// export class HighlightDirective implements AfterViewInit {
//   constructor(private el: ElementRef,
//               private renderer: Renderer2) {}

//   ngAfterViewInit() {
//     this.setBackgroundColor('yellow');
//   }

//   setBackgroundColor(color: string) {
//     this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
//   }
// }