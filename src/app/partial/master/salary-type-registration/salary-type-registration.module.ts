import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryTypeRegistrationRoutingModule } from './salary-type-registration-routing.module';
import { SalaryTypeRegistrationComponent } from './salary-type-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { AddSalaryTypeComponent } from './add-salary-type/add-salary-type.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SalaryTypeRegistrationComponent,
    AddSalaryTypeComponent
  ],
  imports: [
    CommonModule,
    SalaryTypeRegistrationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class SalaryTypeRegistrationModule { }



