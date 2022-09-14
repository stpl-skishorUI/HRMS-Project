import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBankRegistrationComponent } from './company-bank-registration.component';

describe('CompanyBankRegistrationComponent', () => {
  let component: CompanyBankRegistrationComponent;
  let fixture: ComponentFixture<CompanyBankRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyBankRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyBankRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
