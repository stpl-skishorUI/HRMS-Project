import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationRegistrationRoutingModule } from './designation-registration-routing.module';
import { DesignationRegistrationComponent } from './designation-registration.component';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import {MaterialModule} from 'src/app/shared/angularMaterialModule/material.module'

@NgModule({
  declarations: [
    DesignationRegistrationComponent,
    AddDesignationComponent
  ],
  imports: [
    CommonModule,
    DesignationRegistrationRoutingModule,
    MaterialModule
  ]
})
export class DesignationRegistrationModule { }
