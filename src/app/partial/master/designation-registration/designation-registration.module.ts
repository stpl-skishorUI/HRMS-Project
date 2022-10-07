import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationRegistrationRoutingModule } from './designation-registration-routing.module';
import { DesignationRegistrationComponent } from './designation-registration.component';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import {MaterialModule} from 'src/app/shared/angularMaterialModule/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DesignationRegistrationComponent,
    AddDesignationComponent,
  ],
  imports: [
    CommonModule,
    DesignationRegistrationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule


  ]
})
export class DesignationRegistrationModule { }
