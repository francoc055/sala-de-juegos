import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'quien-soy', loadComponent:() => import('./components/quien-soy/quien-soy.component').then( m => m.QuienSoyComponent),  canActivate: [authGuard] },
    { path: 'login', loadComponent:() => import('./components/login/login.component').then( m => m.LoginComponent) },
    { path: 'register', loadComponent:() => import('./components/register/register.component').then( m => m.RegisterComponent) },
    { path: 'home', loadComponent:() => import('./components/home/home.component').then( m => m.HomeComponent), canActivate: [authGuard] },
    { path: 'chat', loadComponent:() => import('./components/chat/chat.component').then( m => m.ChatComponent),  canActivate: [authGuard] },
    { path: 'ahorcado', loadComponent:() => import('./components/ahorcado/ahorcado.component').then( m => m.AhorcadoComponent),  canActivate: [authGuard] },
    { path: 'mayorMenor', loadComponent:() => import('./components/mayor-menor/mayor-menor.component').then( m => m.MayorMenorComponent), canActivate: [authGuard]},
    { path: 'preguntados', loadComponent:() => import('./components/preguntados/preguntados.component').then( m => m.PreguntadosComponent), canActivate: [authGuard]},
    { path: 'buscaminas', loadComponent:() => import('./components/buscaminas/buscaminas.component').then( m => m.BuscaminasComponent), canActivate: [authGuard]},


];
