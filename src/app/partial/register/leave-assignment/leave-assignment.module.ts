import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveAssignmentRoutingModule } from './leave-assignment-routing.module';
import { LeaveAssignmentComponent } from './leave-assignment.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    LeaveAssignmentComponent
  ],
  imports: [
    CommonModule,
    LeaveAssignmentRoutingModule,
    MaterialModule
  ]
})
export class LeaveAssignmentModule { }
