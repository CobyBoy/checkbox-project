import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { UserScopePreferenceModalComponent } from './user-scope-preference-modal/user-scope-preference-modal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'checkbox-project';
  modalRef!: BsModalRef<any>;

  constructor(private modalService: BsModalService) {}


  openPopup() {
    this.modalRef = this.modalService.show(UserScopePreferenceModalComponent, {});
    (this.modalRef.content.onSave as Subject<{ id: number, name: string, customScopes: {id: number, name: string}[]}>).subscribe(
      (teamScope: { id: number, name: string, customScopes: {id: number, name: string}[]})=> {
        sessionStorage.setItem('teamScope', JSON.stringify(teamScope))
      }
    )
  }
  
}
