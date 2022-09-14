import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryTypeRegistrationComponent } from './salary-type-registration.component';

describe('SalaryTypeRegistrationComponent', () => {
  let component: SalaryTypeRegistrationComponent;
  let fixture: ComponentFixture<SalaryTypeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryTypeRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryTypeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
