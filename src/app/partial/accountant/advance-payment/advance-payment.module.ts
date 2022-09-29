import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancePaymentRoutingModule } from './advance-payment-routing.module';
import { AdvancePaymentComponent } from './advance-payment.component';


@NgModule({
  declarations: [
    AdvancePaymentComponent
  ],
  imports: [
    CommonModule,
    AdvancePaymentRoutingModule
  ]
})
export class AdvancePaymentModule { }
