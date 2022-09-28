import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentCompensateComponent } from './absent-compensate.component';

describe('AbsentCompensateComponent', () => {
  let component: AbsentCompensateComponent;
  let fixture: ComponentFixture<AbsentCompensateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentCompensateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsentCompensateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
