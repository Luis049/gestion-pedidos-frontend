import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { GetInfoUser } from '../../../../../../../../presentation/apiRquest';
import { TypeRole } from '../../../../../../../../core/domain/info-user/models/user.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherHome, featherPrinter, featherSend } from '@ng-icons/feather-icons';
import { jamStore } from '@ng-icons/jam-icons';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  active: boolean;
  roles: TypeRole[];
  iconMenu: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    RouterLink,
    NgIcon
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  providers: [provideIcons({ featherSend, featherHome, featherPrinter, jamStore })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenusComponent {
  // menuItems = [
  //   {
  //     label: 'Home',
  //     icon: 'icon-dashboard',
  //     route: '/dashboard',
  //     active: true,
  //   },
  //   {
  //     label: 'Empresas',
  //     icon: 'icon-activity',
  //     route: '/activity',
  //     active: false,
  //   },
  //   {
  //     label: 'Tiendas',
  //     icon: 'icon-schedule',
  //     route: '/schedule',
  //     active: false,
  //   },
  // ];

  constructor(
    private router: Router,
  ) {
    this.validMenusRoles();
  }

  @Input() menuItems: MenuItem[] = [
    { icon: 'Home', label: 'Home', route: 'home', active: true, iconMenu: 'featherHome',roles: ['admin', 'super-admin'] },
    { icon: 'activity', label: 'Empresas', route: 'empresas', active: false, iconMenu: 'featherSend',roles: ['super-admin'] },
    { icon: 'calendar', label: 'Pedidos', route: 'pedidos', active: false, iconMenu: 'featherSend',roles: ['admin'] },
    { icon: 'calendar', label: 'Tiendas', route: 'tiendas', active: false, iconMenu: 'jamStore',roles: ['admin'] },
    { icon: 'settings', label: 'Maquinas', route: 'maquinas', active: false, iconMenu: 'featherPrinter',roles: ['admin'] },
  ];

  validMenusRoles(){
    GetInfoUser.execute().then((response) => {
      this.menuItems = this.menuItems.filter(item => item.roles.some(role => response?.roles.includes(role)));
    });
  }

  onMenuItemClick(clickedItem: MenuItem) {
    this.menuItems.forEach(item => item.active = (item === clickedItem));
    console.log(clickedItem.route);
    this.router.navigate(['dashboard', clickedItem.route]);
  }

 }
