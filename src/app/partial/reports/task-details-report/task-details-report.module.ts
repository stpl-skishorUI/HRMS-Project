import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailsReportRoutingModule } from './task-details-report-routing.module';
import { TaskDetailsReportComponent } from './task-details-report.component';


@NgModule({
  declarations: [
    TaskDetailsReportComponent
  ],
  imports: [
    CommonModule,
    TaskDetailsReportRoutingModule
  ]
})
export class TaskDetailsReportModule { }
