import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRegistrationRoutingModule } from './department-registration-routing.module';
import { DepartmentRegistrationComponent } from './department-registration.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';

@NgModule({
  declarations: [
    DepartmentRegistrationComponent,
    AddDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRegistrationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class DepartmentRegistrationModule { }
