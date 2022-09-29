import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeSalaryReportRoutingModule } from './employee-salary-report-routing.module';
import { EmployeeSalaryReportComponent } from './employee-salary-report.component';


@NgModule({
  declarations: [
    EmployeeSalaryReportComponent
  ],
  imports: [
    CommonModule,
    EmployeeSalaryReportRoutingModule
  ]
})
export class EmployeeSalaryReportModule { }
