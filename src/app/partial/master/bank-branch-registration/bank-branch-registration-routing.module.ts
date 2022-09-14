import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankBranchRegistrationComponent } from './bank-branch-registration.component';

const routes: Routes = [{ path: '', component: BankBranchRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankBranchRegistrationRoutingModule { }
