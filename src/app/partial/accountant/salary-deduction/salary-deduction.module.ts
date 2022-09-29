import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryDeductionRoutingModule } from './salary-deduction-routing.module';
import { SalaryDeductionComponent } from './salary-deduction.component';


@NgModule({
  declarations: [
    SalaryDeductionComponent
  ],
  imports: [
    CommonModule,
    SalaryDeductionRoutingModule
  ]
})
export class SalaryDeductionModule { }
