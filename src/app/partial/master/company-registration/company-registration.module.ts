import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { CompanyRegistrationComponent } from './company-registration.component';


@NgModule({
  declarations: [
    CompanyRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule
  ]
})
export class CompanyRegistrationModule { }
