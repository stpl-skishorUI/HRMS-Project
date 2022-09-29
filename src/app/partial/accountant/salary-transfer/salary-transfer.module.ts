import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryTransferRoutingModule } from './salary-transfer-routing.module';
import { SalaryTransferComponent } from './salary-transfer.component';


@NgModule({
  declarations: [
    SalaryTransferComponent
  ],
  imports: [
    CommonModule,
    SalaryTransferRoutingModule
  ]
})
export class SalaryTransferModule { }
