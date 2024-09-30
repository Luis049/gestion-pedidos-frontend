import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBell } from '@ng-icons/heroicons/outline';
import { tablerMenu2, tablerSun } from '@ng-icons/tabler-icons';
import { GetInfoUser } from '../../../../../../presentation/apiRquest';
import { UserModel } from '../../../../../../core/domain/info-user/models/user.model';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [
    CommonModule,

    NgIcon,
  ],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.scss',
  providers: [provideIcons({ tablerMenu2, tablerSun, heroBell })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NabvarComponent {

  user: UserModel = {
    username: '',
    roles: [],
  };

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle('dark-mode', isChecked);
  }

  constructor() {
    this.getUser();
  }

  getUser(){
    GetInfoUser.execute().then((response) => {
      this.user.username = response?.username || '';
      this.user.roles = response?.roles || [];
    });
  }
}
