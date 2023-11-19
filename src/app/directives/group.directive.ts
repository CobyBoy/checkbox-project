import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGroup]'
})
export class GroupDirective {

  constructor(private elementRef: ElementRef, private viewContainer: ViewContainerRef) {
    
  }
  
  ngOnInit() {
    console.log(this.elementRef.nativeElement);
    console.log(this.viewContainer.element)
  }

}
