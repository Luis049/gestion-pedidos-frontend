import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorsComponent { }
