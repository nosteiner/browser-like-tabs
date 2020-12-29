import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[clickElsewhere]' })
export class ClickElsewhereDirective {
  @Output() clickElsewhere = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event): void {
    event.stopPropagation();
    const targetElement = event.target as HTMLElement;

    if (targetElement !== this.elementRef.nativeElement) {
      this.clickElsewhere.emit(event);
    }
  }
}
