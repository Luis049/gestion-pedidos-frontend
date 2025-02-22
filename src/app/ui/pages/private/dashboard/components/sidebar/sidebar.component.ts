import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from './components/Logo/Logo.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MenusComponent } from './components/menu/menu.component';
import { SwitchComponent } from './components/switch/switch.component';
import { StorageService } from '../../../../../../infrastructure/shared/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent, ProfileComponent, MenusComponent, SwitchComponent],
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
    const company = StorageService.getCompany();
    this.company.name = company?.name || '';

    const user = StorageService.getUser();
    this.user.name = user?.username || '';
  }

  ngOnInit(): void {}

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle('dark-mode', isChecked);
  }

  onModeChange(isDarkMode: boolean) {
    // Aquí puedes manejar el cambio de modo a nivel de aplicación
    console.log('Dark mode:', isDarkMode);
  }

}
