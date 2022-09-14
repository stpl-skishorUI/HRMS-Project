import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationRegistrationRoutingModule } from './designation-registration-routing.module';
import { DesignationRegistrationComponent } from './designation-registration.component';


@NgModule({
  declarations: [
    DesignationRegistrationComponent
  ],
  imports: [
    CommonModule,
    DesignationRegistrationRoutingModule
  ]
})
export class DesignationRegistrationModule { }
