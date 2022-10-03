import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyBankRegistrationComponent } from './add-company-bank-registration.component';

describe('AddCompanyBankRegistrationComponent', () => {
  let component: AddCompanyBankRegistrationComponent;
  let fixture: ComponentFixture<AddCompanyBankRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyBankRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompanyBankRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
