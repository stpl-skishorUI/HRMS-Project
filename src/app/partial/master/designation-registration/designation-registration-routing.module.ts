import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationRegistrationComponent } from './designation-registration.component';

const routes: Routes = [{ path: '', component: DesignationRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRegistrationRoutingModule { }
