import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAlertOctagon, featherAlertTriangle } from '@ng-icons/feather-icons';

@Component({
  selector: 'sd-alert',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  templateUrl: './sd-alert.component.html',
  styleUrl: './sd-alert.component.scss',
  providers: [provideIcons({ featherAlertTriangle, featherAlertOctagon })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdAlertComponent {
  @Input() type: 'success' | 'error' = 'success';
  @Input() text: string = '';
  @Input() reload: boolean = false;

  @Output() reloadClick = new EventEmitter<void>();
}
