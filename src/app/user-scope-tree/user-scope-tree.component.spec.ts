import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScopeTreeComponent } from './user-scope-tree.component';

describe('UserScopeTreeComponent', () => {
  let component: UserScopeTreeComponent;
  let fixture: ComponentFixture<UserScopeTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserScopeTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserScopeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
