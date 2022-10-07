import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryDeductionRoutingModule } from './salary-deduction-routing.module';
import { SalaryDeductionComponent } from './salary-deduction.component';
import {MaterialModule} from 'src/app/shared/angularMaterialModule/material.module';
import { AddNewSalaryComponent } from './add-new-salary/add-new-salary.component'

@NgModule({
  declarations: [
    SalaryDeductionComponent,
    AddNewSalaryComponent
  ],
  imports: [
    CommonModule,
    SalaryDeductionRoutingModule,
    MaterialModule
  ]
})
export class SalaryDeductionModule { }
