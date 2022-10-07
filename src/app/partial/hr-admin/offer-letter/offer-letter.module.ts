import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferLetterRoutingModule } from './offer-letter-routing.module';
import { OfferLetterComponent } from './offer-letter.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    OfferLetterComponent
  ],
  imports: [
    CommonModule,
    OfferLetterRoutingModule,
    MaterialModule
  ]
})
export class OfferLetterModule { }
