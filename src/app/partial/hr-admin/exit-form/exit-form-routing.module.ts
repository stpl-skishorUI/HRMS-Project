import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitFormComponent } from './exit-form.component';

const routes: Routes = [{ path: '', component: ExitFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitFormRoutingModule { }
