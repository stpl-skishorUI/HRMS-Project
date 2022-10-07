import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRegistrationRoutingModule } from './organization-registration-routing.module';
import { OrganizationRegistrationComponent } from './organization-registration.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { MaterialModule} from 'src/app/shared/angularMaterialModule/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    OrganizationRegistrationComponent,
    AddOrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRegistrationRoutingModule,
    MaterialModule,ReactiveFormsModule,FormsModule
  ]
})
export class OrganizationRegistrationModule { }
