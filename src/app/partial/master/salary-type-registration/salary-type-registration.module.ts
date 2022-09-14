import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryTypeRegistrationRoutingModule } from './salary-type-registration-routing.module';
import { SalaryTypeRegistrationComponent } from './salary-type-registration.component';


@NgModule({
  declarations: [
    SalaryTypeRegistrationComponent
  ],
  imports: [
    CommonModule,
    SalaryTypeRegistrationRoutingModule
  ]
})
export class SalaryTypeRegistrationModule { }
