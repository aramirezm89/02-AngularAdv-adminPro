import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotPageFoundComponent } from '../not-page-found/not-page-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',component:NotPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
