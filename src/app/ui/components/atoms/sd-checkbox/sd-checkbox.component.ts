import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from "@ng-icons/heroicons/mini";
import { NgpCheckbox } from "ng-primitives/checkbox";

interface IItem {
  label: string;
  value: string;
}

@Component({
  selector: 'sd-checkbox',
  standalone: true,
  imports: [NgIcon, NgpCheckbox],
  templateUrl: './sd-checkbox.component.html',
  styleUrl: './sd-checkbox.component.scss',
  providers: [provideIcons({ heroCheckMini })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdCheckboxComponent {
   readonly checked = signal(false);
   @Input() id: string = '';
   @Input() label: string = '';
}
