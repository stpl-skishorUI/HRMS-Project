import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceVerificationRoutingModule } from './attendance-verification-routing.module';
import { AttendanceVerificationComponent } from './attendance-verification.component';
import { AddAttendanceVerificationComponent } from './add-attendance-verification/add-attendance-verification.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    AttendanceVerificationComponent,
    AddAttendanceVerificationComponent
  ],
  imports: [
    CommonModule,
    AttendanceVerificationRoutingModule,
    MaterialModule,
  ]
})
export class AttendanceVerificationModule { }
