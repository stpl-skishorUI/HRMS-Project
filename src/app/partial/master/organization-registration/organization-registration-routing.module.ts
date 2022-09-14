import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationRegistrationComponent } from './organization-registration.component';

const routes: Routes = [{ path: '', component: OrganizationRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRegistrationRoutingModule { }
