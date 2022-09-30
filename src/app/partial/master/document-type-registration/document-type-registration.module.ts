import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRegistrationRoutingModule } from './document-type-registration-routing.module';
import { DocumentTypeRegistrationComponent } from './document-type-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DocumentTypeRegistrationComponent
  ],
  imports: [
    CommonModule,
    DocumentTypeRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DocumentTypeRegistrationModule { }
