import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignReportingPersonComponent } from './assign-reporting-person.component';

const routes: Routes = [{ path: '', component: AssignReportingPersonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignReportingPersonRoutingModule { }
