import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCheckbox]'
})
export class CheckboxDirective {
  @HostListener('change', ['$event']) onChange(event: Event) {
    console.log('group checkbox has changed', (event.target as HTMLInputElement));
    this.set((event.target as HTMLInputElement).checked);
  }

  constructor(private elementRef: ElementRef) { }

  set(value: boolean) {
    this.elementRef.nativeElement.closest('accordion').querySelectorAll('app-user-scope-child input[type="checkbox"]').forEach((input: HTMLInputElement) => {
      input.checked = value;
    })
    this.elementRef.nativeElement.closest('accordion').querySelectorAll('app-user-scope-tree input[type="checkbox"]').forEach((input: HTMLInputElement) => {
      input.checked = value;
    })
    this.elementRef.nativeElement.closest('accordion').querySelectorAll('app-user-scope-tree input[type="checkbox"]').forEach((input: HTMLInputElement) => {
      input.indeterminate = false;
    })
  }

}
