import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRegistrationRoutingModule } from './department-registration-routing.module';
import { DepartmentRegistrationComponent } from './department-registration.component';


@NgModule({
  declarations: [
    DepartmentRegistrationComponent
  ],
  imports: [
    CommonModule,
    DepartmentRegistrationRoutingModule
  ]
})
export class DepartmentRegistrationModule { }
