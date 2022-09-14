import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRegistrationRoutingModule } from './organization-registration-routing.module';
import { OrganizationRegistrationComponent } from './organization-registration.component';


@NgModule({
  declarations: [
    OrganizationRegistrationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRegistrationRoutingModule
  ]
})
export class OrganizationRegistrationModule { }
