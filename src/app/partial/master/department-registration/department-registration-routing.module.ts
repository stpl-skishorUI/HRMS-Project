import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentRegistrationComponent } from './department-registration.component';

const routes: Routes = [{ path: '', component: DepartmentRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRegistrationRoutingModule { }
