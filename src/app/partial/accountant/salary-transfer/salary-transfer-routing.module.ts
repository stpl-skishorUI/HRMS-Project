import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryTransferComponent } from './salary-transfer.component';

const routes: Routes = [{ path: '', component: SalaryTransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryTransferRoutingModule { }
