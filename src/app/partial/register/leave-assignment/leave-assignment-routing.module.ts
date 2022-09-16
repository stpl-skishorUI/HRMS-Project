import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveAssignmentComponent } from './leave-assignment.component';

const routes: Routes = [{ path: '', component: LeaveAssignmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveAssignmentRoutingModule { }
