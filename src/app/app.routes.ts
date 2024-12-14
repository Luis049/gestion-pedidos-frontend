import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/private/home/home.component';
import { LoginComponent } from './ui/pages/public/login/login.component';
import { DashboardComponent } from './ui/pages/private/dashboard/dashboard.component';
import { logginGuardFunction } from './shared/guards/loggin.guard';
import { CompaniesComponent } from './ui/pages/private/companies/companies.component';
import { StoresComponent } from './ui/pages/private/stores/stores.component';
import { OrdersComponent } from './ui/pages/private/orders/orders.component';
import { MyOrdersComponent } from './ui/pages/private/orders/my-orders/my-orders.component';
import { OperatorsComponent } from './ui/pages/private/operators/operators.component';
import { MachinesComponent } from './ui/pages/private/machines/machines.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar sesión',
  },
  {
    path: 'admin-login',
    component: LoginComponent,
    title: 'Iniciar sesión como administrador',
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
      { path: 'operadores', component: OperatorsComponent },
      { path: 'maquinas', component: MachinesComponent },
      { path: '**', redirectTo: '/home' }
    ]
  },
  { path: '**', redirectTo: '/dashboard/home' }
];
