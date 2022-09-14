import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveTypeRegistrationRoutingModule } from './leave-type-registration-routing.module';
import { LeaveTypeRegistrationComponent } from './leave-type-registration.component';


@NgModule({
  declarations: [
    LeaveTypeRegistrationComponent
  ],
  imports: [
    CommonModule,
    LeaveTypeRegistrationRoutingModule
  ]
})
export class LeaveTypeRegistrationModule { }
