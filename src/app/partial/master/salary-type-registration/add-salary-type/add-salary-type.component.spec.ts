import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryTypeComponent } from './add-salary-type.component';

describe('AddSalaryTypeComponent', () => {
  let component: AddSalaryTypeComponent;
  let fixture: ComponentFixture<AddSalaryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalaryTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
