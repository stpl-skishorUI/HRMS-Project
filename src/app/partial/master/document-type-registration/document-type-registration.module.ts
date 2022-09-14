import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRegistrationRoutingModule } from './document-type-registration-routing.module';
import { DocumentTypeRegistrationComponent } from './document-type-registration.component';


@NgModule({
  declarations: [
    DocumentTypeRegistrationComponent
  ],
  imports: [
    CommonModule,
    DocumentTypeRegistrationRoutingModule
  ]
})
export class DocumentTypeRegistrationModule { }
