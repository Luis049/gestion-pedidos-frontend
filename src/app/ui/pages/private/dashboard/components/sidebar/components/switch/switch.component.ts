import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {
  isDarkMode = true; // Inicialmente en modo oscuro, basado en la imagen

  @Output() modeChange = new EventEmitter<boolean>();

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    this.modeChange.emit(this.isDarkMode);
  }
 }
