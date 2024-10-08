import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/private/home/home.component';
import { LoginComponent } from './ui/pages/public/login/login.component';
import { DashboardComponent } from './ui/pages/private/dashboard/dashboard.component';
import { logginGuardFunction } from './shared/guards/loggin.guard';
import { CompaniesComponent } from './ui/pages/private/companies/companies.component';
import { StoresComponent } from './ui/pages/private/stores/stores.component';

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
      { path: 'home', component: HomeComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'tiendas', component: StoresComponent },
      { path: '**', redirectTo: '/home' }
    ]
  },
  { path: '**', redirectTo: '/dashboard/home' }
];
