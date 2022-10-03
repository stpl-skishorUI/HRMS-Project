import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyBankRegistrationRoutingModule } from './company-bank-registration-routing.module';
import { CompanyBankRegistrationComponent } from './company-bank-registration.component';
import { AddCompanyBankRegistrationComponent } from './add-company-bank-registration/add-company-bank-registration.component';


@NgModule({
  declarations: [
    CompanyBankRegistrationComponent,
    AddCompanyBankRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompanyBankRegistrationRoutingModule
  ]
})
export class CompanyBankRegistrationModule { }
