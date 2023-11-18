import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/api/endpoint.service';
import { CustomScopeGroupPreferences, UserScopePreference } from './api/scope';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { UserScopePreferenceModalComponent } from './user-scope-preference-modal/user-scope-preference-modal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'checkbox-project';
  modalRef!: BsModalRef<any>;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }



  openPopup() {
    this.modalRef = this.modalService.show(UserScopePreferenceModalComponent, {});
    (this.modalRef.content.onSave as Subject<{ id: number, name: string, customScopes: {id: number, name: string}[]}>).subscribe(
      (teamScope: { id: number, name: string, customScopes: {id: number, name: string}[]})=> {
        sessionStorage.setItem('teamScope', JSON.stringify(teamScope))
      }
    )
  }
  
}
