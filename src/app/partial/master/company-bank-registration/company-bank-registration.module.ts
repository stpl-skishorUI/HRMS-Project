import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyBankRegistrationRoutingModule } from './company-bank-registration-routing.module';
import { CompanyBankRegistrationComponent } from './company-bank-registration.component';
import { AddCompanyBankRegistrationComponent } from './add-company-bank-registration/add-company-bank-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyBankRegistrationComponent,
    AddCompanyBankRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompanyBankRegistrationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompanyBankRegistrationModule { }
