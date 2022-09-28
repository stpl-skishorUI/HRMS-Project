import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceVerificationRoutingModule } from './attendance-verification-routing.module';
import { AttendanceVerificationComponent } from './attendance-verification.component';


@NgModule({
  declarations: [
    AttendanceVerificationComponent
  ],
  imports: [
    CommonModule,
    AttendanceVerificationRoutingModule
  ]
})
export class AttendanceVerificationModule { }
