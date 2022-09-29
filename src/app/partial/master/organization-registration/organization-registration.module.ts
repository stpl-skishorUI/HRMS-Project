import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRegistrationRoutingModule } from './organization-registration-routing.module';
import { OrganizationRegistrationComponent } from './organization-registration.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { MaterialModule} from 'src/app/shared/angularMaterialModule/material.module'
@NgModule({
  declarations: [
    OrganizationRegistrationComponent,
    AddOrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRegistrationRoutingModule,
    MaterialModule
  ]
})
export class OrganizationRegistrationModule { }
