import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveDetailsRoutingModule } from './leave-details-routing.module';
import { LeaveDetailsComponent } from './leave-details.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    LeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    LeaveDetailsRoutingModule,
    MaterialModule,
  ]
})
export class LeaveDetailsModule { }
