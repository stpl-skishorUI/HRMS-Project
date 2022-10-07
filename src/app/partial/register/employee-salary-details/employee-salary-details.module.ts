import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeSalaryDetailsRoutingModule } from './employee-salary-details-routing.module';
import { EmployeeSalaryDetailsComponent } from './employee-salary-details.component';
import { AddNewSalaryComponent } from './add-new-salary/add-new-salary.component';
import {MaterialModule} from 'src/app/shared/angularMaterialModule/material.module'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeSalaryDetailsComponent,
    AddNewSalaryComponent
  ],
  imports: [
    CommonModule,
    EmployeeSalaryDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EmployeeSalaryDetailsModule { }
