import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeSalaryDetailsRoutingModule } from './employee-salary-details-routing.module';
import { EmployeeSalaryDetailsComponent } from './employee-salary-details.component';


@NgModule({
  declarations: [
    EmployeeSalaryDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeSalaryDetailsRoutingModule
  ]
})
export class EmployeeSalaryDetailsModule { }
