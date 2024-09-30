import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sd-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sd-card.component.html',
  styleUrl: './sd-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdCardComponent { }
