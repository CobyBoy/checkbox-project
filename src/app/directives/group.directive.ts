import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGroup]'
})
export class GroupDirective {

  constructor(private elementRef: ElementRef, private viewContainer: ViewContainerRef) {
    
  }
  
  ngOnInit() {
    /*this.elementRef.nativeElement.querySelectorAll('app-checkbox').forEach((element: any) =>
      console.log("the group checkbox",element.querySelector("input[type='checkbox']"))
    );
    this.elementRef.nativeElement.querySelectorAll('accordion-group').forEach((element: any) =>
      console.log("the accordion group checkbox",element));
      */
  }

}
