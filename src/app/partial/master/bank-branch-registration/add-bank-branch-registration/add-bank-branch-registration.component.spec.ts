import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankBranchRegistrationComponent } from './add-bank-branch-registration.component';

describe('AddBankBranchRegistrationComponent', () => {
  let component: AddBankBranchRegistrationComponent;
  let fixture: ComponentFixture<AddBankBranchRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankBranchRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBankBranchRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
