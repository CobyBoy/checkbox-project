import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  //@HostBinding('attr.id') wrapperId: string | null = null
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() for: string = '';
  @Input() required: boolean = false;
  private internalID: string = '';

  get id(): string {
    return this.internalID;
  }
  @Input() set id(newId: string) {
    this.internalID = newId;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
