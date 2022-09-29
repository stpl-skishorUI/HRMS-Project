import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryTransferComponent } from './salary-transfer.component';

describe('SalaryTransferComponent', () => {
  let component: SalaryTransferComponent;
  let fixture: ComponentFixture<SalaryTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
