import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CustomScopePreference } from '../api/scope';
import { UniqueIdService } from '../unique-id.service';

@Component({
  selector: 'app-user-scope-child',
  templateUrl: './user-scope-child.component.html',
  styleUrls: ['./user-scope-child.component.scss']
})
export class UserScopeChildComponent implements AfterContentChecked {
  @Input() scopeChild!: CustomScopePreference[];
  @Output() selectChildCheckboxValue = new EventEmitter<ElementRef>();
  @ViewChild('childCheckboxRef', { static: false }) childCheckboxRef!: ElementRef;
  id: string = '';

  constructor(private cdRef: ChangeDetectorRef,private uniqueIdService:UniqueIdService, private elementRef: ElementRef) { }


  
  public get generateRandomId() : string {
    return crypto.randomUUID().slice(0, 10);
  }

  ngAfterContentChecked() {
    this.id = this.uniqueIdService.generateRandomId()
    this.cdRef.detectChanges();
  }

  trackByFn(index: number, group: CustomScopePreference) {
    return group.id;
  }
  
  onChildCheckboxChange(value: boolean): boolean {
    this.selectChildCheckboxValue.emit(this.elementRef);
    return value;
  }


}
