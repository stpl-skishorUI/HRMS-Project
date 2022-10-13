import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { HolidayMasterComponent } from './partial/master/holiday-master/holiday-master.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule) },
        ]
  },
  {
    path: '',
    component: PartialLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule), data: { title: 'Login' } },
    ]
  },
  
  {
    path: '',
    component: HolidayMasterComponent,
    children: [
      { path: '', loadChildren: () => import('./partial/master/holiday-master/holiday-master.module').then(m => m.HolidayMasterModule), data: { title: 'holiday-master' } },
    ]
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
