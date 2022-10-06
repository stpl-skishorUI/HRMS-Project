import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayMasterRoutingModule } from './holiday-master-routing.module';
import { HolidayMasterComponent } from './holiday-master.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HolidayMasterComponent,
    AddHolidayComponent
  ],
  imports: [
    CommonModule,
    HolidayMasterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HolidayMasterModule { }
