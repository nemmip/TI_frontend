import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBillsComponent } from './users-bills.component';

describe('UsersBillsComponent', () => {
  let component: UsersBillsComponent;
  let fixture: ComponentFixture<UsersBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
