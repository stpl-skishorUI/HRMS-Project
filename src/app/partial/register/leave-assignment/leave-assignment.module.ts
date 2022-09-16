import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveAssignmentRoutingModule } from './leave-assignment-routing.module';
import { LeaveAssignmentComponent } from './leave-assignment.component';


@NgModule({
  declarations: [
    LeaveAssignmentComponent
  ],
  imports: [
    CommonModule,
    LeaveAssignmentRoutingModule
  ]
})
export class LeaveAssignmentModule { }
