import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRegistrationRoutingModule } from './company-registration-routing.module';
import { CompanyRegistrationComponent } from './company-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { AddCompanyComponent } from './add-company/add-company.component';

@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRegistrationRoutingModule,
    MaterialModule
  ]
})
export class CompanyRegistrationModule { }
