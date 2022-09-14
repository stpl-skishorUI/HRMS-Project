import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveTypeRegistrationComponent } from './leave-type-registration.component';

const routes: Routes = [{ path: '', component: LeaveTypeRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveTypeRegistrationRoutingModule { }
