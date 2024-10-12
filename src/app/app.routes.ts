import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/private/home/home.component';
import { LoginComponent } from './ui/pages/public/login/login.component';
import { DashboardComponent } from './ui/pages/private/dashboard/dashboard.component';
import { logginGuardFunction } from './shared/guards/loggin.guard';
import { CompaniesComponent } from './ui/pages/private/companies/companies.component';
import { StoresComponent } from './ui/pages/private/stores/stores.component';
import { OrdersComponent } from './ui/pages/private/orders/orders.component';
import { MyOrdersComponent } from './ui/pages/private/orders/my-orders/my-orders.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin-login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [logginGuardFunction],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'empresas', component: CompaniesComponent },
      { path: 'tiendas', component: StoresComponent },
      { path: 'pedidos', component: OrdersComponent },
      { path: 'mis-pedidos', component: MyOrdersComponent },
      { path: 'operadores', component: OrdersComponent },
      { path: '**', redirectTo: '/home' }
    ]
  },
  { path: '**', redirectTo: '/dashboard/home' }
];
