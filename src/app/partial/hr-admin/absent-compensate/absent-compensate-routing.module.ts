import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsentCompensateComponent } from './absent-compensate.component';

const routes: Routes = [{ path: '', component: AbsentCompensateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsentCompensateRoutingModule { }
