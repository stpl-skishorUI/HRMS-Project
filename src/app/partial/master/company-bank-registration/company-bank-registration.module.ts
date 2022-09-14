import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyBankRegistrationRoutingModule } from './company-bank-registration-routing.module';
import { CompanyBankRegistrationComponent } from './company-bank-registration.component';


@NgModule({
  declarations: [
    CompanyBankRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompanyBankRegistrationRoutingModule
  ]
})
export class CompanyBankRegistrationModule { }
