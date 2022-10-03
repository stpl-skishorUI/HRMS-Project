import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { CompanyRegistrationComponent } from './company-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { AddCompanyComponent } from './add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompanyRegistrationModule { }
