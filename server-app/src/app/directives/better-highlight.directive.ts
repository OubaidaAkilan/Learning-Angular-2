import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';

  // Approch Two to detect the property using @HostBinding decorator
  @HostBinding('style.color') kColor: string = this.defaultColor;

  // Approch one to detect the property using Renderer
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      '#001858'
    );

    this.kColor = this.defaultColor;
  }

  // To make events
  @HostListener('mouseenter') mouseOver(eventDate: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      '#8bd3dd'
    );

    this.kColor = '#f582ae';
  }

  @HostListener('mouseleave') mouseLeave(eventDate: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      '#001858'
    );

    this.kColor = '#fff';
  }
}
