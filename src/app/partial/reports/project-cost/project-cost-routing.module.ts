import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCostComponent } from './project-cost.component';

const routes: Routes = [{ path: '', component: ProjectCostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectCostRoutingModule { }
