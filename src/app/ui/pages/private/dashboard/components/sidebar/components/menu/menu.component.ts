import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { GetInfoUser } from '../../../../../../../../presentation/apiRquest';
import { TypeRole } from '../../../../../../../../core/domain/info-user/models/user.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  featherHome,
  featherPrinter,
  featherSend,
} from '@ng-icons/feather-icons';
import { jamStore } from '@ng-icons/jam-icons';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  active: boolean;
  roles: TypeRole[];
  iconMenu: string;
  data_test: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, NgIcon],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  providers: [
    provideIcons({ featherSend, featherHome, featherPrinter, jamStore }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenusComponent implements OnInit {
  constructor(private router: Router) {
    this.validMenusRoles();
  }
  ngOnInit(): void {
    this.menuItems.forEach((item) => {
      item.active = item.route === this.router.url.split('/')[2];
    });
  }

  @Input() menuItems: MenuItem[] = [
    {
      data_test: 'menu-item-home',
      icon: 'Home',
      label: 'Home',
      route: 'home',
      active: true,
      iconMenu: 'featherHome',
      roles: ['admin', 'super-admin'],
    },
    {
      data_test: 'menu-item-empresas',
      icon: 'activity',
      label: 'Empresas',
      route: 'empresas',
      active: false,
      iconMenu: 'featherSend',
      roles: ['super-admin'],
    },
    {
      data_test: 'menu-item-pedidos',
      icon: 'calendar',
      label: 'Pedidos',
      route: 'pedidos',
      active: false,
      iconMenu: 'featherSend',
      roles: ['admin', 'operator', 'attendant'],
    },
    {
      data_test: 'menu-item-mis-pedidos',
      icon: 'calendar',
      label: 'Mis pedidos',
      route: 'mis-pedidos',
      active: false,
      iconMenu: 'featherSend',
      roles: ['client'],
    },
    {
      data_test: 'menu-item-tiendas',
      icon: 'calendar',
      label: 'Tiendas',
      route: 'tiendas',
      active: false,
      iconMenu: 'jamStore',
      roles: ['admin', 'attendant'],
    },
    {
      data_test: 'menu-item-operadores',
      icon: 'calendar',
      label: 'Operadores',
      route: 'operadores',
      active: false,
      iconMenu: 'jamStore',
      roles: ['admin', 'attendant'],
    },
    {
      data_test: 'menu-item-maquinas',
      icon: 'settings',
      label: 'Maquinas',
      route: 'maquinas',
      active: false,
      iconMenu: 'featherPrinter',
      roles: ['admin'],
    },
  ];

  validMenusRoles() {
    GetInfoUser.execute().then((response) => {
      this.menuItems = this.menuItems.filter((item) =>
        item.roles.some((role) => response?.roles.includes(role))
      );
    });
  }

  onMenuItemClick(clickedItem: MenuItem) {
    this.menuItems.forEach((item) => (item.active = item === clickedItem));
    this.router.navigate(['dashboard', clickedItem.route]);
  }
}
