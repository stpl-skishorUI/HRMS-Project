import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalarySlipComponent } from './salary-slip.component';

const routes: Routes = [{ path: '', component: SalarySlipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalarySlipRoutingModule { }
