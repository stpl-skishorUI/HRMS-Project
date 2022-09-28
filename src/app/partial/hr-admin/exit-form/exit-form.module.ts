import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExitFormRoutingModule } from './exit-form-routing.module';
import { ExitFormComponent } from './exit-form.component';


@NgModule({
  declarations: [
    ExitFormComponent
  ],
  imports: [
    CommonModule,
    ExitFormRoutingModule
  ]
})
export class ExitFormModule { }
