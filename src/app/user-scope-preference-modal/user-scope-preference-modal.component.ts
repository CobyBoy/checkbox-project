import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EndpointService } from '../api/endpoint.service';
import { CustomScopeDto, CustomScopeGroupPreferences, UserScopePreference, teamScopeDto } from '../api/scope';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-scope-preference-modal',
  templateUrl: './user-scope-preference-modal.component.html',
  styleUrls: ['./user-scope-preference-modal.component.scss']
})
export class UserScopePreferenceModalComponent implements OnInit {
  @Input() params: teamScopeDto = { id: 1, name: '', customScopes: [] };
  userScopePreference: UserScopePreference[] = [];
  teamScope: teamScopeDto = { id: 1, name: '', customScopes: [] };
  teamList: string[] = [];
  selectedTeam!: UserScopePreference | undefined;
  onSave: Subject<{ id: number, name: string, customScopes: {id: number, name: string}[]}> = new Subject()

  constructor(private endPoint: EndpointService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.endPoint.getScopes().subscribe(data => {
      this.userScopePreference = data;
      this.teamList = data.map(d => d.teamName);
      this.teamScope = this.params;
      this.selectedTeam = data.find(scope => scope.id === this.params.id);
    });
  }

  public get customScopeGroupPreferences(): CustomScopeGroupPreferences[] | undefined{
    return this.userScopePreference.find(scope => scope.selected)?.customScopeGroupPreferences;
  }

  onSelectionChange(teamName: string) {
    const unselectedScope = this.userScopePreference.find(scope => scope.teamName === teamName);
    if (unselectedScope) {
      unselectedScope.selected = true;
      this.selectedTeam = unselectedScope;
    }
    this.userScopePreference.filter(scope => scope.teamName !== teamName).forEach(s => s.selected = false)
  }

  save() {
    this.onSave.next(this.teamScope);
    this.hideModal();
  }

  hideModal() {
    this.modalRef.hide();
  }

  getSelectedCustomScopes(selectedScopeGroup: CustomScopeGroupPreferences[]): { customScopes: CustomScopeDto []} {
    let result: { customScopes: CustomScopeDto[] } = { customScopes: [] };
    let obj : { customScopes: CustomScopeDto[] } = { customScopes: [] };

    let selectedCustomScopes = selectedScopeGroup.reduce((previousCustomScopes: { customScopes: CustomScopeDto[] }, customScopeGroup: CustomScopeGroupPreferences) => {
      if (customScopeGroup.children.length) {
        let selectedChildrenCustomScopes = this.getSelectedCustomScopes(customScopeGroup.children);
        result = { ...selectedChildrenCustomScopes };
      }
      if (customScopeGroup.customScopePreference.length) {
        const selectedCustomScopes = customScopeGroup.customScopePreference.filter(scope => scope.selected).map(({ id, name }) => ({ id, name }));
        previousCustomScopes.customScopes.push(...selectedCustomScopes);
      }
      return previousCustomScopes
    }, { customScopes: [] });

    obj.customScopes.push(...selectedCustomScopes.customScopes);
    obj.customScopes.push(...result.customScopes);

    return obj;
  }

}
