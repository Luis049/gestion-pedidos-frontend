import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from './components/Logo/Logo.component';
import { GetInfoCompany, GetInfoUser } from '../../../../../../presentation/apiRquest';
import { ProfileComponent } from './components/profile/profile.component';
import { MenusComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent, ProfileComponent, MenusComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  user = {
    name: '',
    avatarUrl: 'assets/avatar.jpg',
  };

  company = {
    name: '',
    avatarUrl: 'assets/avatar.jpg',
  };


  constructor() {
    this.loadUser();
  }

  async loadUser() {
    GetInfoCompany.execute().then((response) => {
      this.company.name = response?.name || '';
    });
    GetInfoUser.execute().then((response) => {
      this.user.name = response?.name || '';
    });
  }

  ngOnInit(): void {}

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle('dark-mode', isChecked);
  }
}
