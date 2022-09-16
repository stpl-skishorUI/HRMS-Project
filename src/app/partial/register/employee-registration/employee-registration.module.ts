import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRegistrationRoutingModule } from './employee-registration-routing.module';
import { EmployeeRegistrationComponent } from './employee-registration.component';


@NgModule({
  declarations: [
    EmployeeRegistrationComponent
  ],
  imports: [
    CommonModule,
    EmployeeRegistrationRoutingModule
  ]
})
export class EmployeeRegistrationModule { }
