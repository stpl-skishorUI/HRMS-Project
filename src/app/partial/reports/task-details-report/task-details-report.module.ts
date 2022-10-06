import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailsReportRoutingModule } from './task-details-report-routing.module';
import { TaskDetailsReportComponent } from './task-details-report.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    TaskDetailsReportComponent
  ],
  imports: [
    CommonModule,
    TaskDetailsReportRoutingModule,
    MaterialModule
  ]
})
export class TaskDetailsReportModule { }
