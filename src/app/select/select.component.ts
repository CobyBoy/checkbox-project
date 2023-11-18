import { Component, Input, OnInit } from '@angular/core';

export interface AnyObject {
  [key: string]: any
}

export type Item = string | AnyObject

interface SelectEventOption {
  [key: string]: any;
  selected: boolean;
  value: string;
}

export interface SelectEventTarget extends EventTarget {
  options: SelectEventOption[];
  value: Item;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
