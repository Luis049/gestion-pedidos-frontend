import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getClassColor } from '../../shared/utils';

export type TypeColors = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'rose' | 'indigo';

@Component({
  selector: 'sd-circule-color',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sd-circule-color.component.html',
  styleUrl: './sd-circule-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdCirculeColorComponent {
  @Input() color = '';

 }
