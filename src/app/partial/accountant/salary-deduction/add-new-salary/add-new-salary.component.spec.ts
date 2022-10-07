import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSalaryComponent } from './add-new-salary.component';

describe('AddNewSalaryComponent', () => {
  let component: AddNewSalaryComponent;
  let fixture: ComponentFixture<AddNewSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
