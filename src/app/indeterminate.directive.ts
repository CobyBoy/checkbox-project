import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIndeterminate]'
})
export class IndeterminateDirective {

  constructor(private elementRef: ElementRef, private viewContainer: ViewContainerRef) {
    console.log(elementRef.nativeElement.closest('.accordion-group'));
    console.log(viewContainer)
   }

}
