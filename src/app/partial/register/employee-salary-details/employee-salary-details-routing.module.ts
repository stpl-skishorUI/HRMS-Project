import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSalaryDetailsComponent } from './employee-salary-details.component';

const routes: Routes = [{ path: '', component: EmployeeSalaryDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSalaryDetailsRoutingModule { }
