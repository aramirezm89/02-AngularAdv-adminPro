import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path:'', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '**', component: NotPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
