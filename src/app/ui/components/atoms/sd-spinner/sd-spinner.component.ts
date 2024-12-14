import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { cssSpinner } from '@ng-icons/css.gg';


@Component({
  selector: 'sd-spinner',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
  ],
  templateUrl: './sd-spinner.component.html',
  styleUrl: './sd-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ cssSpinner })],
})
export class SdSpinnerComponent {
}
