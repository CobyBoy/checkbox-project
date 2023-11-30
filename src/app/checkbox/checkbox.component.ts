import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() name: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() invalid: boolean | null = null;
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  private internalID: string = '';
  
  @Input() set id(newId: string) {
    this.internalID = newId;
  }

  get id(): string {
    return this.internalID;
  }

  constructor() { }


  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked
    this.checkedChange.emit(target.checked);
  }

  onBlur() {
    
  }

}
