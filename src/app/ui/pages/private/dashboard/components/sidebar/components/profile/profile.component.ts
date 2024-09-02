import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() userName: string = 'Louis Carter';
  @Input() avatarUrl: string = '/assets/avatar.jpg';

  onEditClick() {
    // Implementar lógica de edición aquí
    console.log('Edit profile clicked');
  }

}
