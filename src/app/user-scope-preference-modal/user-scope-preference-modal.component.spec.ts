import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScopePreferenceModalComponent } from './user-scope-preference-modal.component';

describe('UserScopePreferenceModalComponent', () => {
  let component: UserScopePreferenceModalComponent;
  let fixture: ComponentFixture<UserScopePreferenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserScopePreferenceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserScopePreferenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
