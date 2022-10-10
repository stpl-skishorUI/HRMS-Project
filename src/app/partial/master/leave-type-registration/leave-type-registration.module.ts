import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveTypeRegistrationRoutingModule } from './leave-type-registration-routing.module';
import { LeaveTypeRegistrationComponent } from './leave-type-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LeaveTypeRegistrationComponent,
    AddLeaveTypeComponent
  ],
  imports: [
    CommonModule,
    LeaveTypeRegistrationRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LeaveTypeRegistrationModule { }
