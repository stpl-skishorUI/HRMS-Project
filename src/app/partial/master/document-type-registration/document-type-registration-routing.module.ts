import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypeRegistrationComponent } from './document-type-registration.component';

const routes: Routes = [{ path: '', component: DocumentTypeRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeRegistrationRoutingModule { }
