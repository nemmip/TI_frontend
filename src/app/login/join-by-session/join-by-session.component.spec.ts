import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBySessionComponent } from './join-by-session.component';

describe('JoinBySessionComponent', () => {
  let component: JoinBySessionComponent;
  let fixture: ComponentFixture<JoinBySessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinBySessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinBySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
