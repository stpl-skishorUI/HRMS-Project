import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancePaymentRoutingModule } from './advance-payment-routing.module';
import { AdvancePaymentComponent } from './advance-payment.component';
import {MaterialModule} from 'src/app/shared/angularMaterialModule/material.module';
import { AddNewPaymentComponent } from './add-new-payment/add-new-payment.component'

@NgModule({
  declarations: [
    AdvancePaymentComponent,
    AddNewPaymentComponent
  ],
  imports: [
    CommonModule,
    AdvancePaymentRoutingModule,
    MaterialModule
  ]
})
export class AdvancePaymentModule { }
