import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface AnyObject {
  [key: string]: any;
}

export type Item = string | AnyObject | any

interface SelectEventOption {
  [key: string]: any;
  selected: boolean;
  value: string;
}

export interface SelectEventTarget extends EventTarget {
  options: SelectEventOption[];
  value: Item;
}

type SelectItem = Item | Item[];
type ChangeFunction = (value?: SelectItem) => any;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  internalId: string = '';
  @Input() bind_label: string = '';
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;
  @Input() name: string = '';
  @Input() helperText: string = '';
  @Input() options: Item[] = [];
  @Input() placeholder: string = '';
  @Input() value: SelectItem = '';
  @Output() valueChange = new EventEmitter<SelectItem>();
  @Output() selectBlur = new EventEmitter<Event>();
  @Input() set id(newId: string) {
    this.internalId = newId;
  }
  get id(): string {
    return this.internalId;
  }


  constructor() { }

  ngOnInit(): void {
  }

  getSelectedValue(value: Item): Item | undefined {
    return this.options.find((item: Item) => {
      if (typeof this.bind_label == "object") {
        return item[this.bind_label] === value;
      }
      return item === value;
      
    });
  }

  onChange(e: Event) {
    const value = (e.target as SelectEventTarget).value;
    if (this.multiple) {
      const selectedOptions: Item[] = [];
      const options: SelectEventOption[] = Array.from(
        (e.target as SelectEventTarget).options
      );
      options.forEach((option: SelectEventOption) => {
        if (option.selected) {
          const selectedOption = this.getSelectedValue(option.value);
          if (true) {
            selectedOptions.push(selectedOption)
          }
        }
      });
      this.valueChange.emit(selectedOptions);
    }
    else {
      const selectedOption = this.getSelectedValue(value);
      this.valueChange.emit(selectedOption);

    }
  }

  onBlur(e: FocusEvent) {

  }

  isSelected(option: Item) {
    if (Array.isArray(this.value)) {
      return this.value.find((item: Item) => this.hasMatch(option, item))
    }
    return this.hasMatch(option, this.value);
  }

  hasMatch(option: Item, value: Item): boolean {
    return value[this.bind_label] === option[this.bind_label]
  }

}
