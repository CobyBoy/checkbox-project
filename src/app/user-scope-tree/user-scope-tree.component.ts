import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked, ChangeDetectionStrategy, ElementRef, ViewChildren, QueryList, AfterViewInit, Renderer2 } from '@angular/core';
import { CustomScopeGroupPreferences, UserScopePreference } from '../api/scope';
import { UniqueIdService } from '../unique-id.service';
import { UserScopeChildComponent } from '../user-scope-child/user-scope-child.component';

@Component({
  selector: 'app-user-scope-tree',
  templateUrl: './user-scope-tree.component.html',
  styleUrls: ['./user-scope-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserScopeTreeComponent implements AfterContentChecked, AfterViewInit {
  @Input() customScopeGroupPreferences: CustomScopeGroupPreferences[] | undefined = [];
  id: string = '';
  @ViewChildren(UserScopeChildComponent) selectionChildComponent!: QueryList<UserScopeChildComponent>;

  constructor(private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
            private renderer: Renderer2,
            private uniqueIdService: UniqueIdService) { }


  public get generateRandomId() : string {
    return crypto.randomUUID().slice(0, 10);
  }

  ngAfterViewInit() {
    if (this.customScopeGroupPreferences && this.selectionChildComponent) {
      this.selectUnselectMainGroupCheckboxOnModalOpen(this.customScopeGroupPreferences, this.selectionChildComponent)
    } 
    //this.cdRef.detectChanges();
  }

  ngAfterContentChecked() {
    this.id = this.uniqueIdService.generateRandomId();
    this.cdRef.detectChanges();
  }

  trackByFn(index: number, group: CustomScopeGroupPreferences) {
    return group.id;
  }

  onCheckboxChange(value: boolean, group: CustomScopeGroupPreferences): boolean {
    group.selected = value;
    this.updateChildrenCheckboxWithNewValue(value, group);
    this.selectUnselectMainGroupCheckbox();
    this.cdRef.detectChanges();
    return value;
  }

  onSelectChildCheckboxChange(event: ElementRef<any>,group: CustomScopeGroupPreferences) {
    this.selectUnselectChildGroupCheckbox(event, group);
    this.selectUnselectMainGroupCheckbox();
  }

  private selectUnselectChildGroupCheckbox(event: ElementRef<any>, group: CustomScopeGroupPreferences) {
    const isOneScopeUnselected = group.customScopePreference.some(g => !g.selected);
    const isThereMoreThanOneScope = group.customScopePreference.length > 1;
    const scopesConfiguration = { isThereMoreThanOneScope, isOneScopeUnselected };
    group.selected = !isOneScopeUnselected;
    const inputChildGroupCheckbox = event.nativeElement?.offsetParent?.parentElement?.nextSibling.children[0]?.children[0] as HTMLInputElement;
    if (inputChildGroupCheckbox) {
      this.updateChildCheckBoxProperties(scopesConfiguration, group, inputChildGroupCheckbox);
    }
  }

  private updateChildCheckBoxProperties(scopesConfiguration: { isThereMoreThanOneScope: boolean, isOneScopeUnselected: boolean },
    group: CustomScopeGroupPreferences, inputChildGroupCheckbox: HTMLInputElement) {
    const checked = 'checked';
    const indeterminate = 'indeterminate';
    const inputStates = { checked, indeterminate };
    if (scopesConfiguration.isThereMoreThanOneScope) {
      this.updateInputChildGroupWhenThereIsOnlyOneScope(scopesConfiguration, group, inputChildGroupCheckbox, inputStates)
    }
    else {
      this.renderer.setProperty(inputChildGroupCheckbox, checked, scopesConfiguration.isOneScopeUnselected);
    }
  }

  private updateInputChildGroupWhenThereIsOnlyOneScope(scopesConfiguration: { isThereMoreThanOneScope: boolean, isOneScopeUnselected: boolean },
    group: CustomScopeGroupPreferences, inputChildGroupCheckbox: HTMLInputElement, inputStates: { checked: string, indeterminate: string }) {
    const areAllScopeUnselected = group.customScopePreference.every(g => !g.selected);
    if (scopesConfiguration.isOneScopeUnselected && !areAllScopeUnselected) {
      this.renderer.setProperty(inputChildGroupCheckbox, inputStates.checked, false);
      this.renderer.setProperty(inputChildGroupCheckbox, inputStates.indeterminate, true);
    }

    else if (areAllScopeUnselected) {
      this.renderer.setProperty(inputChildGroupCheckbox, inputStates.checked, false);
      this.renderer.setProperty(inputChildGroupCheckbox, inputStates.indeterminate, false);
    }
    else {
      this.renderer.setProperty(inputChildGroupCheckbox, inputStates.checked, true);
      this.renderer.setProperty(inputChildGroupCheckbox, inputStates.indeterminate, false);
    }
  }

  private selectUnselectMainGroupCheckbox() {
    const isOneMainGroupUnselected = this.customScopeGroupPreferences?.some(g => !g.selected);
    const areAllMainGroupUnselected = this.customScopeGroupPreferences?.every(g => !g.selected);
    // @ts-ignore
    const isOneChildrenUnselected = this.isAtLeastOneChildrenOfTheGroupUnselected(this.customScopeGroupPreferences);
    // @ts-ignore
    const areChildrenUnselected = this.areAllChildrenOfTheGroupUnselected(this.customScopeGroupPreferences);
    const mainGroupCheckbox = this.elementRef.nativeElement.offsetParent?.parentElement?.nextSibling;
    const maingGroupUnselectionConfiguration = { isOneMainGroupUnselected, areAllMainGroupUnselected };
    if (mainGroupCheckbox) {
      const mainGroupInput = mainGroupCheckbox?.children[0]?.children[0] as HTMLInputElement;
      // @ts-ignore
      this.updateGroupCheckboxProperties(maingGroupUnselectionConfiguration, isOneChildrenUnselected, areChildrenUnselected, mainGroupInput)
    }
    this.cdRef.markForCheck();
  }

  private updateGroupCheckboxProperties(maingGroupUnselectionConfiguration: {
    isOneMainGroupUnselected: boolean, areAllMainGroupUnselected: boolean
  },
    isOneChildrenUnselected: boolean, 
    areChildrenUnselected: boolean,
    mainGroupInput: HTMLInputElement
  ) {
    const checked = 'checked';
    const indeterminate = 'indeterminate';
    if (maingGroupUnselectionConfiguration.isOneMainGroupUnselected &&
      !maingGroupUnselectionConfiguration.areAllMainGroupUnselected) { 
      setTimeout(() => {
        this.renderer.setProperty(mainGroupInput, indeterminate, true);
        this.renderer.setProperty(mainGroupInput, checked, false)
      });
    }
    
    else if (maingGroupUnselectionConfiguration.areAllMainGroupUnselected && !isOneChildrenUnselected) {
      this.renderer.setProperty(mainGroupInput, indeterminate, false);
      this.renderer.setProperty(mainGroupInput, checked, false)
    }
    else if (isOneChildrenUnselected && !maingGroupUnselectionConfiguration.areAllMainGroupUnselected ) {
      this.renderer.setProperty(mainGroupInput, indeterminate, true);
      this.renderer.setProperty(mainGroupInput, checked, false)
    }

    else if (isOneChildrenUnselected && maingGroupUnselectionConfiguration.areAllMainGroupUnselected && !areChildrenUnselected) {
      this.renderer.setProperty(mainGroupInput, indeterminate, true);
      this.renderer.setProperty(mainGroupInput, checked, false);
    }

    else if (maingGroupUnselectionConfiguration.isOneMainGroupUnselected && maingGroupUnselectionConfiguration.areAllMainGroupUnselected
    && isOneChildrenUnselected && areChildrenUnselected) {
      this.renderer.setProperty(mainGroupInput, indeterminate, false);
      this.renderer.setProperty(mainGroupInput, checked, false)
    }

    else {
      this.renderer.setProperty(mainGroupInput, indeterminate, maingGroupUnselectionConfiguration.areAllMainGroupUnselected);
      this.renderer.setProperty(mainGroupInput, checked, !maingGroupUnselectionConfiguration.areAllMainGroupUnselected)
    }

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

  private updateChildrenCheckboxWithNewValue(value: boolean, child: CustomScopeGroupPreferences) {
    child.selected = value;
    if (child.customScopePreference.length > 0) {
      child.customScopePreference.forEach(custom => custom.selected = value)
    }
    if (child.children.length > 0) {
      child.children.forEach(c => this.updateChildrenCheckboxWithNewValue(value, c))
    }
    this.cdRef.markForCheck();
  }

  selectUnselectMainGroupCheckboxOnModalOpen(group: CustomScopeGroupPreferences[], selectionChildComponent: QueryList<UserScopeChildComponent>) {
    if (group.length === 0) return;
    let childMainGroupCheckbox: HTMLInputElement;
    const checked = 'checked';
    const indeterminate = 'indeterminate';
    const groupCheckbox = selectionChildComponent;
    const isAtLeastOneChildrenGroupUnselected = this.isAtLeastOneChildrenOfTheGroupUnselected(group.filter(g => g.customScopePreference))
    const areAllChildrenOfTheGroupUnselected = this.areAllChildrenOfTheGroupUnselected(group.filter(g => g.customScopePreference))
    const isOneMainGroupUnselected = group.some(g => !g.selected)
    const areAllMainGroupUnselected = group.every(g => !g.selected);
    const mainGroupInputCheckbox = this.getMainGroupInputCheckboxFromChildren();
    const maingGroupUnselectionConfiguration = { areAllMainGroupUnselected, isOneMainGroupUnselected };
    const childrenUnselectedConfiguration = { isAtLeastOneChildrenGroupUnselected, areAllChildrenOfTheGroupUnselected };
    const inputStates = { checked, indeterminate };
    groupCheckbox.forEach(childComponent => {
      let childInput: HTMLInputElement = this.getChildInput(childComponent);
      if (childInput?.checked && childComponent.scopeChild.some(scope => !scope.selected) ||
      childInput.checked && !childComponent.scopeChild.every(scope => scope.selected)) {
        childMainGroupCheckbox = childInput;
      }
    })
    this.changeMainGroupCheckboxState(mainGroupInputCheckbox, inputStates, maingGroupUnselectionConfiguration, childrenUnselectedConfiguration);
    // @ts-ignore
    this.changeChildrenGroupCheckboxState(isAtLeastOneChildrenGroupUnselected, childMainGroupCheckbox, inputStates)

    
  }

  private getMainGroupInputCheckboxFromChildren(): HTMLInputElement {
    return this.elementRef.nativeElement?.closest('.d-flex')?.children[1]?.children[0]?.children[0] as HTMLInputElement;
  }

  private getChildInput(childComponent: UserScopeChildComponent): HTMLInputElement {
    return childComponent.childCheckboxRef.nativeElement?.closest('.d-flex')?.children[1]?.children[0]?.children[0];
  }

  private changeMainGroupCheckboxState(
    mainGroupInputCheckbox: HTMLInputElement,
    inputStates: { checked: string, indeterminate: string },
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
       this.renderer.setProperty(mainGroupInputCheckbox, inputStates.checked, true) 
      });
    }

    else if (mainGroupUnselectedConfiguration.isOneMainGroupUnselected ||
      childrenUnselectedConfiguration.isAtLeastOneChildrenGroupUnselected && !mainGroupUnselectedConfiguration.areAllMainGroupUnselected) {
      setTimeout(() => {
        this.renderer.setProperty(mainGroupInputCheckbox, inputStates.checked, false) 
        this.renderer.setProperty(mainGroupInputCheckbox, inputStates.indeterminate, true) 
      });
    }

    else {
      this.renderer.setProperty(mainGroupInputCheckbox, inputStates.checked, false)
    }

  }

  private changeChildrenGroupCheckboxState(isAtLeastOneChildrenGroupUnselected: boolean,
    childMainGroupCheckbox: HTMLInputElement,
    inputStates: { checked: string, indeterminate: string }) {
    if (!childMainGroupCheckbox) return;
    if (!isAtLeastOneChildrenGroupUnselected) {
      setTimeout(() => {
        this.renderer.setProperty(childMainGroupCheckbox, inputStates.checked, true)
      });
    }

    else if (isAtLeastOneChildrenGroupUnselected) {
      setTimeout(() => {
        this.renderer.setProperty(childMainGroupCheckbox, inputStates.indeterminate, true)
      });
    }

    else {
      this.renderer.setProperty(childMainGroupCheckbox, inputStates.checked, false)
    }
  }

}
