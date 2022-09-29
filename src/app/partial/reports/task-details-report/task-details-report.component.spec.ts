import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsReportComponent } from './task-details-report.component';

describe('TaskDetailsReportComponent', () => {
  let component: TaskDetailsReportComponent;
  let fixture: ComponentFixture<TaskDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
