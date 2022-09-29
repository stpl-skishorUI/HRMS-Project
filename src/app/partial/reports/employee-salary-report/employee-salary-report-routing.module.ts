import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSalaryReportComponent } from './employee-salary-report.component';

const routes: Routes = [{ path: '', component: EmployeeSalaryReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSalaryReportRoutingModule { }
