import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankRegistrationComponent } from './add-bank-registration.component';

describe('AddBankRegistrationComponent', () => {
  let component: AddBankRegistrationComponent;
  let fixture: ComponentFixture<AddBankRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBankRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
