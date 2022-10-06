import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceVerificationComponent } from './add-attendance-verification.component';

describe('AddAttendanceVerificationComponent', () => {
  let component: AddAttendanceVerificationComponent;
  let fixture: ComponentFixture<AddAttendanceVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttendanceVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttendanceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
