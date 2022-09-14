import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryTypeRegistrationComponent } from './salary-type-registration.component';

const routes: Routes = [{ path: '', component: SalaryTypeRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryTypeRegistrationRoutingModule { }
