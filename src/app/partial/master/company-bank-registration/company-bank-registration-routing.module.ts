import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyBankRegistrationComponent } from './company-bank-registration.component';

const routes: Routes = [{ path: '', component: CompanyBankRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyBankRegistrationRoutingModule { }
