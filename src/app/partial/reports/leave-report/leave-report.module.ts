import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveReportRoutingModule } from './leave-report-routing.module';
import { LeaveReportComponent } from './leave-report.component';


@NgModule({
  declarations: [
    LeaveReportComponent
  ],
  imports: [
    CommonModule,
    LeaveReportRoutingModule
  ]
})
export class LeaveReportModule { }
