import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CustomScopePreference } from '../api/scope';
import { UniqueIdService } from '../unique-id.service';

@Component({
  selector: 'app-user-scope-child',
  templateUrl: './user-scope-child.component.html',
  styleUrls: ['./user-scope-child.component.scss']
})
export class UserScopeChildComponent implements AfterContentChecked, AfterContentInit {
  @Input() scopeChild!: CustomScopePreference[];
  @Output() selectChildCheckboxValue = new EventEmitter<ElementRef>();
  @ViewChild('childCheckboxRef', { static: false }) childCheckboxRef!: ElementRef;
  id: string = '';
  checkboxIds: string[] = [];

  constructor(private cdRef: ChangeDetectorRef,private uniqueIdService:UniqueIdService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.id = this.uniqueIdService.generateRandomId()
}

  generateCheckboxIds(): void {
    this.checkboxIds = this.scopeChild.map(() => this.uniqueIdService.generateRandomId().slice(0, 10));
  }

  ngAfterContentInit() {
    this.generateCheckboxIds();
  }

  ngAfterContentChecked() {
    
    this.cdRef.detectChanges();
  }

  trackByFn(index: number, group: CustomScopePreference) {
    return group.id;
  }
  
  onChildCheckboxChange(value: boolean): boolean {
    console.log('child checkbox compoennet changged', value)
    this.selectChildCheckboxValue.emit(this.elementRef);
    return value;
  }


}
