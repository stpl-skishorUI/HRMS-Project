import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignReportingPersonRoutingModule } from './assign-reporting-person-routing.module';
import { AssignReportingPersonComponent } from './assign-reporting-person.component';


@NgModule({
  declarations: [
    AssignReportingPersonComponent
  ],
  imports: [
    CommonModule,
    AssignReportingPersonRoutingModule
  ]
})
export class AssignReportingPersonModule { }
