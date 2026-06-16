import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TriajeComponent } from './components/triaje/triaje.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'triaje', component: TriajeComponent },
  { path: '**', redirectTo: 'login' },
];
