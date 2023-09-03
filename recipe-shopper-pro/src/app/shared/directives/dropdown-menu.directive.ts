import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdownMenu]',
})
export class DropdownMenuDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {

    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) {}
}

/* ['$event']: This part is an array that specifies what event data to pass to the method
 when the event occurs. In this case, it's passing the $event object, 
 which contains information about the click event, to the method. */
