import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBranchRegistrationComponent } from './bank-branch-registration.component';

describe('BankBranchRegistrationComponent', () => {
  let component: BankBranchRegistrationComponent;
  let fixture: ComponentFixture<BankBranchRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankBranchRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBranchRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
