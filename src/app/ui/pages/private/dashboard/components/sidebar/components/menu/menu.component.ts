import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GetInfoUser } from '../../../../../../../../presentation/apiRquest';
import { TypeRole } from '../../../../../../../../core/domain/info-user/models/user.model';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  active: boolean;
  roles: TypeRole[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,

    RouterLink,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
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
    { icon: 'Home', label: 'Home', route: '/home', active: true, roles: ['admin', 'super-admin'] },
    { icon: 'activity', label: 'Empresas', route: '/empresas', active: false, roles: ['super-admin'] },
    { icon: 'calendar', label: 'Tiendas', route: '/tiendas', active: false, roles: ['admin'] },
    { icon: 'settings', label: 'Maquinas', route: '/maquinas', active: false, roles: ['admin'] },
  ];

  validMenusRoles(){
    GetInfoUser.execute().then((response) => {
      this.menuItems = this.menuItems.filter(item => item.roles.some(role => response?.roles.includes(role)));
    });
  }

  onMenuItemClick(clickedItem: MenuItem) {
    this.menuItems.forEach(item => item.active = (item === clickedItem));
    this.router.navigate([]);
  }

 }
