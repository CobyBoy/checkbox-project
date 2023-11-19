import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChildrenCheckbox]'
})
export class ChildrenCheckboxDirective {
  @HostListener('change', ['$event']) onChange(event: Event) {
    console.log('child checkbox has changed', (event.target as HTMLInputElement))
    this.set();
  }

  constructor(private elementRef: ElementRef) { }
  
  set() {
    const checkbox = this.elementRef.nativeElement.closest('accordion').querySelectorAll('app-checkbox')
    console.log(checkbox[checkbox.length - 1])
  }

}
