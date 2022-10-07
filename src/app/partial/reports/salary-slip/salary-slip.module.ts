import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalarySlipRoutingModule } from './salary-slip-routing.module';
import { SalarySlipComponent } from './salary-slip.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    SalarySlipComponent
  ],
  imports: [
    CommonModule,
    SalarySlipRoutingModule,
    MaterialModule
  ]
})
export class SalarySlipModule { }
