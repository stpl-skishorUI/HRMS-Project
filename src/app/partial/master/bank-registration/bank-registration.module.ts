import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRegistrationRoutingModule } from './bank-registration-routing.module';
import { BankRegistrationComponent } from './bank-registration.component';
import { AddBankRegistrationComponent } from './add-bank-registration/add-bank-registration.component';


@NgModule({
  declarations: [
    BankRegistrationComponent,
    AddBankRegistrationComponent
  ],
  imports: [
    CommonModule,
    BankRegistrationRoutingModule
  ]
})
export class BankRegistrationModule { }
