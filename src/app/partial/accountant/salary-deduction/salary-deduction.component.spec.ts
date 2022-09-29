import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDeductionComponent } from './salary-deduction.component';

describe('SalaryDeductionComponent', () => {
  let component: SalaryDeductionComponent;
  let fixture: ComponentFixture<SalaryDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryDeductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
