import { Routes } from '@angular/router';
import { AuthLayout } from './Layouts/auth-layout/auth-layout';
import { Login } from './Pages/login/login';

export const routes: Routes = [
  {path:'',loadComponent:()=>import('./Layouts/auth-layout/auth-layout').then(c=>c.AuthLayout),
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',loadComponent:()=>import('./Pages/login/login').then(c=>c.Login)},
      {path:'register',loadComponent:()=>import('./Pages/register/register').then(c=>c.Register)}
    ]
  },
  {path:'user',loadComponent:()=>import('./Layouts/user-layout/user-layout').then(c=>c.UserLayout)}
];
