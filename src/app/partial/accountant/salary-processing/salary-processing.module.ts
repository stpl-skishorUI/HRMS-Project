import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryProcessingRoutingModule } from './salary-processing-routing.module';
import { SalaryProcessingComponent } from './salary-processing.component';
import {MaterialModule} from 'src/app/shared/angularMaterialModule/material.module'

@NgModule({
  declarations: [
    SalaryProcessingComponent
  ],
  imports: [
    CommonModule,
    SalaryProcessingRoutingModule,
    MaterialModule
  ]
})
export class SalaryProcessingModule { }
