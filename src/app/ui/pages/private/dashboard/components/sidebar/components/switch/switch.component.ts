import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerArrowBarToRight } from '@ng-icons/tabler-icons';
import { StorageService } from '@infrastructure/shared/storage/storage.service';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  providers: [provideIcons({ tablerArrowBarToRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {
  constructor(private router: Router) {}
  isDarkMode = true; // Inicialmente en modo oscuro, basado en la imagen

  @Output() modeChange = new EventEmitter<boolean>();

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    this.modeChange.emit(this.isDarkMode);
  }

  async logout() {
    const user = StorageService.getUser();
    let isAdmin = false;
    if(user?.roles){
      user?.roles.forEach((role) => {
        if (['admin', 'super-admin', 'attendant'].includes(role)) {
          isAdmin = true;
        }
      });
    }
    sessionStorage.removeItem('token');
    if(isAdmin){
      this.router.navigate(['/admin-login']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
