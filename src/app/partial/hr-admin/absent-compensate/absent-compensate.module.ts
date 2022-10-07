import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsentCompensateRoutingModule } from './absent-compensate-routing.module';
import { AbsentCompensateComponent } from './absent-compensate.component';
import { AddAbsentCompensateComponent } from './add-absent-compensate/add-absent-compensate.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    AbsentCompensateComponent,
    AddAbsentCompensateComponent
  ],
  imports: [
    CommonModule,
    AbsentCompensateRoutingModule,
    MaterialModule,
  ]
})
export class AbsentCompensateModule { }
