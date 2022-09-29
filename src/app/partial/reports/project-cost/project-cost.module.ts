import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectCostRoutingModule } from './project-cost-routing.module';
import { ProjectCostComponent } from './project-cost.component';


@NgModule({
  declarations: [
    ProjectCostComponent
  ],
  imports: [
    CommonModule,
    ProjectCostRoutingModule
  ]
})
export class ProjectCostModule { }
