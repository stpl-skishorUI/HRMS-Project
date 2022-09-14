import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankBranchRegistrationRoutingModule } from './bank-branch-registration-routing.module';
import { BankBranchRegistrationComponent } from './bank-branch-registration.component';


@NgModule({
  declarations: [
    BankBranchRegistrationComponent
  ],
  imports: [
    CommonModule,
    BankBranchRegistrationRoutingModule
  ]
})
export class BankBranchRegistrationModule { }
