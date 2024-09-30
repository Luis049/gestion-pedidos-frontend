import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  selector: 'sd-button',
  standalone: true,
  imports: [
    CommonModule,
    NgpButton
  ],
  templateUrl: './sd-button.component.html',
  styleUrl: './sd-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdButtonComponent {
  @Input() text: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'primary' | 'secondary' | 'white' | 'danger' = 'primary';
 }
