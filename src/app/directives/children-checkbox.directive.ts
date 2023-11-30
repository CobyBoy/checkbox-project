import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChildrenCheckbox]'
})
export class ChildrenCheckboxDirective {
  @HostListener('change', ['$event']) onChange(event: Event) {
    const inputCheckbox = event.target as HTMLInputElement;
    console.log('child checkbox has changed', inputCheckbox)
    this.setGroupInput();
    this.changeGroupCheckboxState(inputCheckbox);
    
  }
  groupInputsList!: NodeList;
  groupAppCheckbox!: HTMLElement;
  groupInput: HTMLInputElement | null = null;


  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.groupInputsList = this.getGroupInputsList();
    this.getNativeElement();
  }

  setGroupInput() {
    const groupCheckboxList: NodeList | undefined = this.getAccordionThatHasAppCheckboxComponent()?.querySelectorAll('app-checkbox');
    if (groupCheckboxList) {
      this.groupAppCheckbox = groupCheckboxList[groupCheckboxList?.length - 1] as HTMLElement;
      this.groupInput = this.groupAppCheckbox.querySelector("input[type='checkbox']");
    }

  }
  changeGroupCheckboxState(input: HTMLInputElement) {
    const groupInputList: NodeList = this.getGroupInputsList();
    const areAllInputsOfThisGroupSelected = Array.from(groupInputList).every((item: Node) => (item as HTMLInputElement).checked);
    const areAnyInputsOfThisGroupSelected = Array.from(groupInputList).some((item: Node) => (item as HTMLInputElement).checked);
    if (this.groupInput) {
      if (areAnyInputsOfThisGroupSelected && !areAllInputsOfThisGroupSelected) {
        this.groupInput.checked = false;
        this.groupInput.indeterminate = areAnyInputsOfThisGroupSelected
      }
      else {
        this.groupInput.checked = areAllInputsOfThisGroupSelected;
        this.groupInput.indeterminate = false
      }
    }

  }

  getGroupInputsList(): NodeList {
    console.log( this.elementRef.nativeElement.closest('app-user-scope-tree').querySelectorAll("input[type='checkbox']"))
    return this.elementRef.nativeElement.closest('app-user-scope-child').querySelectorAll("input[type='checkbox']");
  }

  getNativeElement() {
    console.log("nativeElement", this.elementRef.nativeElement)
  }

  getAccordionThatHasAppCheckboxComponent() {
    return (this.elementRef.nativeElement as HTMLElement).closest('accordion')
  }

}
