import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsentCompensateRoutingModule } from './absent-compensate-routing.module';
import { AbsentCompensateComponent } from './absent-compensate.component';


@NgModule({
  declarations: [
    AbsentCompensateComponent
  ],
  imports: [
    CommonModule,
    AbsentCompensateRoutingModule
  ]
})
export class AbsentCompensateModule { }
