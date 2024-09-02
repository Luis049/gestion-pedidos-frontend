import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/private/home/home.component';
import { LoginComponent } from './ui/pages/public/login/login.component';
import { DashboardComponent } from './ui/pages/private/dashboard/dashboard.component';
import { logginGuardFunction } from './shared/guards/loggin.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [logginGuardFunction],
    children: [
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
