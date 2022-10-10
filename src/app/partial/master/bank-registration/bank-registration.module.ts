import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRegistrationRoutingModule } from './bank-registration-routing.module';
import { BankRegistrationComponent } from './bank-registration.component';
import { AddBankRegistrationComponent } from './add-bank-registration/add-bank-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BankRegistrationComponent,
    AddBankRegistrationComponent,
  ],
  imports: [
    CommonModule,
    BankRegistrationRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class BankRegistrationModule { }
