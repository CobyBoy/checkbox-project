import { Component, Input, ChangeDetectorRef, AfterContentChecked, ChangeDetectionStrategy, ElementRef, ViewChildren, QueryList, AfterViewInit, Renderer2, AfterContentInit } from '@angular/core';
import { CustomScopeGroupPreferences } from '../api/scope';
import { UniqueIdService } from '../unique-id.service';
import { UserScopeChildComponent } from '../user-scope-child/user-scope-child.component';
import { CheckboxService } from '../checkbox.service';

class Constants {
  static checked: string = 'checked';
  static indeterminate: string = 'indeterminate';
}

@Component({
  selector: 'app-user-scope-tree',
  templateUrl: './user-scope-tree.component.html',
  styleUrls: ['./user-scope-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserScopeTreeComponent implements AfterContentChecked, AfterViewInit, AfterContentChecked, AfterContentInit {
  checkboxIds: string[] = [];
  @Input() customScopeGroupPreferences: CustomScopeGroupPreferences[] | undefined = [];
  id: string = '';
  @ViewChildren(UserScopeChildComponent) selectionChildComponent!: QueryList<UserScopeChildComponent>;

  constructor(private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
            private checkboxService: CheckboxService,
            private uniqueIdService: UniqueIdService) { }

  generateCheckboxIds(): void {
    if(this.customScopeGroupPreferences)
    this.checkboxIds = this.customScopeGroupPreferences.map(() => this.uniqueIdService.generateRandomId().slice(0, 10));
  }

  ngAfterContentInit() {
   
  }

  ngAfterViewInit() {
    this.generateCheckboxIds();
    if (this.customScopeGroupPreferences && this.selectionChildComponent) {
      //this.selectUnselectMainGroupCheckboxOnModalOpen(this.customScopeGroupPreferences, this.selectionChildComponent)
    } 
  }

  ngAfterContentChecked() {
    this.id = this.uniqueIdService.generateRandomId();
    this.cdRef.detectChanges();
  }

  trackByFn(index: number, group: CustomScopeGroupPreferences) {
    return group.id;
  }

  onCheckboxChange(value: boolean, index: string, group: CustomScopeGroupPreferences): boolean {
    group.selected = value;
    this.checkboxService.update(index, value);
    this.cdRef.detectChanges();
    return value;
  }

  onSelectChildCheckboxChange(event: ElementRef<any>,group: CustomScopeGroupPreferences) {
  }


  areAllChildrenOfTheGroupUnselected(scopeGroup: CustomScopeGroupPreferences[]): boolean {
    return scopeGroup.some(group => this.areAllGroupUnselected(group) || this.areAllChildrenOfTheGroupUnselected(group.children))
  }

  areAllGroupUnselected(group: CustomScopeGroupPreferences): boolean {
    return group.customScopePreference.length > 0 && group.customScopePreference.every(scope => !scope.selected)
  }

  isAtLeastOneChildrenOfTheGroupUnselected(scopeGroup: CustomScopeGroupPreferences[]): boolean {
    return scopeGroup.some(g => this.isAtLeastOneGroupUnselected(g) || this.isAtLeastOneChildrenOfTheGroupUnselected(g.children))
  }

  isAtLeastOneGroupUnselected(group: CustomScopeGroupPreferences): boolean {
    return group.customScopePreference.length > 0 && group.customScopePreference.some(s => !s.selected)
  }


  selectUnselectMainGroupCheckboxOnModalOpen(group: CustomScopeGroupPreferences[], selectionChildComponent: QueryList<UserScopeChildComponent>) {
    if (group.length === 0) return;
    let childMainGroupCheckbox: HTMLInputElement;
    const groupCheckbox = selectionChildComponent;
    const isAtLeastOneChildrenGroupUnselected = this.isAtLeastOneChildrenOfTheGroupUnselected(group.filter(g => g.customScopePreference))
    const areAllChildrenOfTheGroupUnselected = this.areAllChildrenOfTheGroupUnselected(group.filter(g => g.customScopePreference))
    const isOneMainGroupUnselected = group.some(g => !g.selected)
    const areAllMainGroupUnselected = group.every(g => !g.selected);
    const mainGroupInputCheckbox = this.getMainGroupInputCheckboxFromChildren();
    const maingGroupUnselectionConfiguration = { areAllMainGroupUnselected, isOneMainGroupUnselected };
    const childrenUnselectedConfiguration = { isAtLeastOneChildrenGroupUnselected, areAllChildrenOfTheGroupUnselected };
    groupCheckbox.forEach(childComponent => {
      let childInput: HTMLInputElement = this.getChildInput(childComponent);
      if (childInput?.checked && childComponent.scopeChild.some(scope => !scope.selected) ||
      childInput.checked && !childComponent.scopeChild.every(scope => scope.selected)) {
        childMainGroupCheckbox = childInput;
      }
    })
    this.changeMainGroupCheckboxStateWhenModalOpens(mainGroupInputCheckbox, maingGroupUnselectionConfiguration, childrenUnselectedConfiguration);
    // @ts-ignore
    this.changeChildrenGroupCheckboxStateWhenModalOpens(isAtLeastOneChildrenGroupUnselected, childMainGroupCheckbox)

    
  }

  private getMainGroupInputCheckboxFromChildren(): HTMLInputElement {
    return this.elementRef.nativeElement?.closest('.d-flex')?.children[1]?.children[0]?.children[0] as HTMLInputElement;
  }

  private getChildInput(childComponent: UserScopeChildComponent): HTMLInputElement {
    return childComponent.childCheckboxRef.nativeElement?.closest('.d-flex')?.children[1]?.children[0]?.children[0];
  }

  private changeMainGroupCheckboxStateWhenModalOpens(
    mainGroupInputCheckbox: HTMLInputElement,
    mainGroupUnselectedConfiguration: {
      areAllMainGroupUnselected: boolean,
      isOneMainGroupUnselected: boolean
    },
    childrenUnselectedConfiguration: {
      isAtLeastOneChildrenGroupUnselected: boolean;
      areAllChildrenOfTheGroupUnselected: boolean
    }
  ) {
    if (!mainGroupUnselectedConfiguration.areAllMainGroupUnselected && !mainGroupUnselectedConfiguration.isOneMainGroupUnselected
    && childrenUnselectedConfiguration.areAllChildrenOfTheGroupUnselected) {
      setTimeout(() => {
       this.renderer.setProperty(mainGroupInputCheckbox, Constants.checked, true) 
      });
    }

    else if (mainGroupUnselectedConfiguration.isOneMainGroupUnselected ||
      childrenUnselectedConfiguration.isAtLeastOneChildrenGroupUnselected && !mainGroupUnselectedConfiguration.areAllMainGroupUnselected) {
      setTimeout(() => {
        this.renderer.setProperty(mainGroupInputCheckbox, Constants.checked, false) 
        this.renderer.setProperty(mainGroupInputCheckbox, Constants.indeterminate, true) 
      });
    }

    else {
      this.renderer.setProperty(mainGroupInputCheckbox, Constants.checked, false)
    }

  }

  private changeChildrenGroupCheckboxStateWhenModalOpens(isAtLeastOneChildrenGroupUnselected: boolean,
    childMainGroupCheckbox: HTMLInputElement) {
    if (!childMainGroupCheckbox) return;
    if (!isAtLeastOneChildrenGroupUnselected) {
      setTimeout(() => {
        this.renderer.setProperty(childMainGroupCheckbox, Constants.checked, true)
      });
    }

    else if (isAtLeastOneChildrenGroupUnselected) {
      setTimeout(() => {
        this.renderer.setProperty(childMainGroupCheckbox, Constants.indeterminate, true)
      });
    }

    else {
      this.renderer.setProperty(childMainGroupCheckbox, Constants.checked, false)
    }
  }

}
