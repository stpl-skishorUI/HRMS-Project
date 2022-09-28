import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceVerificationComponent } from './attendance-verification.component';

const routes: Routes = [{ path: '', component: AttendanceVerificationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceVerificationRoutingModule { }
