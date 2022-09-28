import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferLetterRoutingModule } from './offer-letter-routing.module';
import { OfferLetterComponent } from './offer-letter.component';


@NgModule({
  declarations: [
    OfferLetterComponent
  ],
  imports: [
    CommonModule,
    OfferLetterRoutingModule
  ]
})
export class OfferLetterModule { }
