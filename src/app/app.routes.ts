import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'quien-soy', loadComponent:() => import('./components/quien-soy/quien-soy.component').then( m => m.QuienSoyComponent) },
    { path: 'login', loadComponent:() => import('./components/login/login.component').then( m => m.LoginComponent) },
    { path: 'register', loadComponent:() => import('./components/register/register.component').then( m => m.RegisterComponent) },
    { path: 'home', loadComponent:() => import('./components/home/home.component').then( m => m.HomeComponent) },

];
