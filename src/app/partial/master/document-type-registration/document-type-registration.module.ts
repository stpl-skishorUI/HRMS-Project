import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRegistrationRoutingModule } from './document-type-registration-routing.module';
import { DocumentTypeRegistrationComponent } from './document-type-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddDocumentTypeRegistrationComponent } from './add-document-type-registration/add-document-type-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    DocumentTypeRegistrationComponent,
    AddDocumentTypeRegistrationComponent
  ],
  imports: [
    CommonModule,
    DocumentTypeRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ]
})
export class DocumentTypeRegistrationModule { }
