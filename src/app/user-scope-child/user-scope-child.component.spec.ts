import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScopeChildComponent } from './user-scope-child.component';

describe('UserScopeChildComponent', () => {
  let component: UserScopeChildComponent;
  let fixture: ComponentFixture<UserScopeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserScopeChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserScopeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
