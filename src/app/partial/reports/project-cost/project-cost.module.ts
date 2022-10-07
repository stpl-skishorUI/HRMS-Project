import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectCostRoutingModule } from './project-cost-routing.module';
import { ProjectCostComponent } from './project-cost.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    ProjectCostComponent
  ],
  imports: [
    CommonModule,
    ProjectCostRoutingModule,
    MaterialModule
  ]
})
export class ProjectCostModule { }
