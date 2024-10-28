import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArchive, lucideCheck, lucideCircleCheckBig, lucidePackage, lucidePrinter, lucideTriangleAlert, lucideTruck, lucideUser } from '@ng-icons/lucide';
import { getClassColor, getClassStatus } from '../../shared/utils';

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

  @Input() type: 'hexadecimal' | 'status' | 'machine' = 'hexadecimal';


  get getClass(){
    return `${getClassColor(this.bgColor)} text-white px-3 py-1 rounded-full`;
  }

  get getClassStatus(){
    return `${getClassStatus(this.bgColor)} px-3 py-1 rounded-full`;
  }
 }
