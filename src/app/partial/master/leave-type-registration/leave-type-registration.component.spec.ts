import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeRegistrationComponent } from './leave-type-registration.component';

describe('LeaveTypeRegistrationComponent', () => {
  let component: LeaveTypeRegistrationComponent;
  let fixture: ComponentFixture<LeaveTypeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTypeRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTypeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
