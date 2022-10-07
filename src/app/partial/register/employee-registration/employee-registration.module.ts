import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRegistrationRoutingModule } from './employee-registration-routing.module';
import { EmployeeRegistrationComponent } from './employee-registration.component';
import { MaterialModule} from 'src/app/shared/angularMaterialModule/material.module';
import { AddEmployeeDetailsComponent } from './add-employee-details/add-employee-details.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    EmployeeRegistrationComponent,
    AddEmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class EmployeeRegistrationModule { }
