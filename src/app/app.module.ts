import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserScopeTreeComponent } from './user-scope-tree/user-scope-tree.component';
import { UserScopeChildComponent } from './user-scope-child/user-scope-child.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { LabelComponent } from './label/label.component';
import { IndeterminateDirective } from './indeterminate.directive';
import { UserScopePreferenceModalComponent } from './user-scope-preference-modal/user-scope-preference-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    UserScopeTreeComponent,
    UserScopeChildComponent,
    CheckboxComponent,
    LabelComponent,
    IndeterminateDirective,
    UserScopePreferenceModalComponent,
    DropdownComponent,
    SelectComponent
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
