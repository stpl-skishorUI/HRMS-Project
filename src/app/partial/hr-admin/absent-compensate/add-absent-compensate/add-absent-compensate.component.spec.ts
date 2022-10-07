import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsentCompensateComponent } from './add-absent-compensate.component';

describe('AddAbsentCompensateComponent', () => {
  let component: AddAbsentCompensateComponent;
  let fixture: ComponentFixture<AddAbsentCompensateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbsentCompensateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAbsentCompensateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
