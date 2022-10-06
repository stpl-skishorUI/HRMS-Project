import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeSalaryReportRoutingModule } from './employee-salary-report-routing.module';
import { EmployeeSalaryReportComponent } from './employee-salary-report.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    EmployeeSalaryReportComponent
  ],
  imports: [
    CommonModule,
    EmployeeSalaryReportRoutingModule,
    MaterialModule
  ]
})
export class EmployeeSalaryReportModule { }
