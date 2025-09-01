import { Routes } from '@angular/router';
import { AuthLayout } from './Layouts/auth-layout/auth-layout';
import { Login } from './Pages/login/login';
import { authGuard } from './core/Gaurds/authGuard';
import { registerGuard } from './core/Gaurds/register-guard';

export const routes: Routes = [

  {path:'',loadComponent:()=>import('./Layouts/auth-layout/auth-layout').then(c=>c.AuthLayout),
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',loadComponent:()=>import('./Pages/login/login').then(c=>c.Login)},
      {path:'register',loadComponent:()=>import('./Pages/register/register').then(c=>c.Register),canDeactivate:[registerGuard]},

    ]
  },
  {path:'',loadComponent:()=>import('./Layouts/user-layout/user-layout').then(c=>c.UserLayout),canActivate:[authGuard],
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent:()=>import('./Pages/home/home').then(c=>c.Home)},
      {path:'products',loadComponent:()=>import('./Pages/products/products').then(c=>c.Products)},
      {path:'category',loadComponent:()=>import('./Pages/category/category').then(c=>c.Category)},
      {path:'cart',loadComponent:()=>import('./Pages/cart/cart').then(c=>c.Cart)},
      {path:'details/:id',loadComponent:()=>import('./Pages/details/details').then(c=>c.Details)},
      {path:'specificcategory/:category',loadComponent:()=>import('./Pages/specifi-category/specifi-category').then(c=>c.SpecifiCategory)}
    ]
  }

];
