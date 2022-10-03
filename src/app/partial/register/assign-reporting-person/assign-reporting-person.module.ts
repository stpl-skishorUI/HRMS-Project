import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignReportingPersonRoutingModule } from './assign-reporting-person-routing.module';
import { AssignReportingPersonComponent } from './assign-reporting-person.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    AssignReportingPersonComponent
  ],
  imports: [
    CommonModule,
    AssignReportingPersonRoutingModule,
    MaterialModule,
  ]
})
export class AssignReportingPersonModule { }
