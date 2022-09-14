import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankRegistrationComponent } from './bank-registration.component';

const routes: Routes = [{ path: '', component: BankRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRegistrationRoutingModule { }
