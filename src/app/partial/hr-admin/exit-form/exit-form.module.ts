import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExitFormRoutingModule } from './exit-form-routing.module';
import { ExitFormComponent } from './exit-form.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    ExitFormComponent
  ],
  imports: [
    CommonModule,
    ExitFormRoutingModule,
    MaterialModule,
  ]
})
export class ExitFormModule { }
