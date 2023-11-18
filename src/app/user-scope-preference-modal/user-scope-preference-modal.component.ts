import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EndpointService } from '../api/endpoint.service';
import { CustomScopeGroupPreferences, UserScopePreference } from '../api/scope';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-scope-preference-modal',
  templateUrl: './user-scope-preference-modal.component.html',
  styleUrls: ['./user-scope-preference-modal.component.scss']
})
export class UserScopePreferenceModalComponent implements OnInit {
  userScopePreference: UserScopePreference[] = [];
  teamScope: any
  onSave: Subject<{ id: number, name: string, customScopes: {id: number, name: string}[]}> = new Subject()

  constructor(private endPoint: EndpointService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.endPoint.getScopes().subscribe(data => {
      this.userScopePreference = data
    });
  }

  public get customScopeGroupPreferences(): CustomScopeGroupPreferences[] | undefined{
    return this.userScopePreference.find(scope => scope.selected)?.customScopeGroupPreferences;
  }

  save() {
    this.onSave.next(this.teamScope);
    this.hideModal();
  }

  hideModal() {
    this.modalRef.hide();
  }

  getSelectedCustomScopes() {
    
  }

}
