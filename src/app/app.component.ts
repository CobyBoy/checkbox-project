import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { UserScopePreferenceModalComponent } from './user-scope-preference-modal/user-scope-preference-modal.component';
import { Subject } from 'rxjs';
import { teamScopeDto } from './api/scope';

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
    const teamScope: teamScopeDto = {id: 2, name: '', customScopes: []}
    const initialState = { params: teamScope}
    this.modalRef = this.modalService.show(UserScopePreferenceModalComponent, { initialState });
    (this.modalRef.content.onSave as Subject<{ id: number, name: string, customScopes: {id: number, name: string}[]}>).subscribe(
      (teamScope: { id: number, name: string, customScopes: {id: number, name: string}[]})=> {
        sessionStorage.setItem('teamScope', JSON.stringify(teamScope))
      }
    )
  }
  
}
