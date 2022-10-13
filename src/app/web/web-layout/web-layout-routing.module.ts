import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule),data: { title: ' Home' } },
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule), data: { title: 'Login' }, },
  { path: 'forgot-password', loadChildren: () => import('../forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule), data: { title: 'Login' }, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }
