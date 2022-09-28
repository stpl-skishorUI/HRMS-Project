import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveDetailsRoutingModule } from './leave-details-routing.module';
import { LeaveDetailsComponent } from './leave-details.component';


@NgModule({
  declarations: [
    LeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    LeaveDetailsRoutingModule
  ]
})
export class LeaveDetailsModule { }
