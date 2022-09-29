import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryProcessingRoutingModule } from './salary-processing-routing.module';
import { SalaryProcessingComponent } from './salary-processing.component';


@NgModule({
  declarations: [
    SalaryProcessingComponent
  ],
  imports: [
    CommonModule,
    SalaryProcessingRoutingModule
  ]
})
export class SalaryProcessingModule { }
