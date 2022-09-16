import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReportingPersonComponent } from './assign-reporting-person.component';

describe('AssignReportingPersonComponent', () => {
  let component: AssignReportingPersonComponent;
  let fixture: ComponentFixture<AssignReportingPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignReportingPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignReportingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
