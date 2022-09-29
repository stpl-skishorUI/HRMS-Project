import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsReportComponent } from './task-details-report.component';

const routes: Routes = [{ path: '', component: TaskDetailsReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskDetailsReportRoutingModule { }
