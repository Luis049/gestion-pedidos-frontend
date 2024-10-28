
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SdSelectComponent } from "../../atoms/sd-select/sd-select.component";
import { TypeColors, SdCirculeColorComponent } from '../../atoms/sd-circule-color/sd-circule-color.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherChevronDown } from '@ng-icons/feather-icons';

export interface IColors {
  value: TypeColors;
  label: string;
}

@Component({
  selector: 'sd-input-color',
  standalone: true,
  imports: [
    CommonModule,
    SdSelectComponent,
    SdCirculeColorComponent,

    NgIcon
],
  templateUrl: './sd-input-color.component.html',
  providers: [provideIcons({  featherChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdInputColorComponent {
  @Output() colorSelectedChange = new EventEmitter<TypeColors>();
  @Input() dataTestId: string = '';
  open = false;
  colorsItems: IColors[] = [
    { value: 'red', label: 'Rojo' },
    { value: 'blue', label: 'Azul' },
    { value: 'green', label: 'Verde' },
    { value: 'yellow', label: 'Amarillo' },
    { value: 'purple', label: 'Púrpura' },
    { value: 'rose', label: 'Rosa' },
    { value: 'indigo', label: 'Indigo' },
  ];

  @Input() colorSelected: TypeColors = 'red';

  onChange(color: TypeColors) {
    this.colorSelected = color;
    this.open = false;
    this.colorSelectedChange.emit(color);
  }

  get getLabelSelected() {
    return this.colorsItems.find((item) => item.value === this.colorSelected)?.label;
  }

 }
