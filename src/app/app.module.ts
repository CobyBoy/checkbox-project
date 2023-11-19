import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserScopeTreeComponent } from './user-scope-tree/user-scope-tree.component';
import { UserScopeChildComponent } from './user-scope-child/user-scope-child.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { LabelComponent } from './label/label.component';
import { GroupDirective } from './directives/group.directive';
import { UserScopePreferenceModalComponent } from './user-scope-preference-modal/user-scope-preference-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SelectComponent } from './select/select.component';
import { CheckboxDirective } from './directives/checkbox.directive';
import { ChildrenCheckboxDirective } from './directives/children-checkbox.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserScopeTreeComponent,
    UserScopeChildComponent,
    CheckboxComponent,
    LabelComponent,
    GroupDirective,
    UserScopePreferenceModalComponent,
    DropdownComponent,
    SelectComponent,
    CheckboxDirective,
    ChildrenCheckboxDirective
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
