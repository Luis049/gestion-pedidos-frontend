import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArchive, lucideCheck, lucideCircleCheckBig, lucidePackage, lucidePrinter, lucideTriangleAlert, lucideTruck, lucideUser } from '@ng-icons/lucide';

@Component({
  selector: 'sd-tag',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  templateUrl: './sd-tag.component.html',
  styleUrl: './sd-tag.component.scss',
  providers: [provideIcons({
    lucidePackage,
    lucidePrinter,
    lucideCircleCheckBig,
    lucideTruck,
    lucideArchive,
    lucideTriangleAlert,
    lucideCheck,

    lucideUser,
   })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdTagComponent {
  @Input() text: string = '';
  @Input() bgColor = '#fff';
  @Input() textColor = '#000'
  @Input() icon: string = '';

  @Input() isHexadecimal = false;


 }
