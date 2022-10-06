import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveReportRoutingModule } from './leave-report-routing.module';
import { LeaveReportComponent } from './leave-report.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    LeaveReportComponent
  ],
  imports: [
    CommonModule,
    LeaveReportRoutingModule,
    MaterialModule,
  ]
})
export class LeaveReportModule { }
