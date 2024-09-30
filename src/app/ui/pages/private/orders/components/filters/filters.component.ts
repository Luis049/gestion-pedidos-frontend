import { machines } from './../../data/machines.data';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { SdSearchFieldComponent } from '../../../../../components/atoms/sd-search-field/sd-search-field.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { jamFilter } from '@ng-icons/jam-icons';
import { tablerUTurnLeft } from "@ng-icons/tabler-icons";
import { SdCheckboxComponent } from "../../../../../components/atoms/sd-checkbox/sd-checkbox.component";
import { SdSelectComponent } from "../../../../../components/atoms/sd-select/sd-select.component";
import { apiMachines } from '../../../../../../presentation/apiRquest';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    SdSearchFieldComponent,
    SdCheckboxComponent,
    SdSelectComponent
],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  viewProviders: [provideIcons({ featherAirplay, jamFilter, tablerUTurnLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() machineSelectedChange = new EventEmitter<string>();
  @Output() statusSelectedChange = new EventEmitter<string>();

  @Input() machines: { label: string; value: string }[] = [];
  @Input() machineSelected: string = '0';

  @Input() status: { label: string; value: string }[] = []
  @Input() statusSelected: string = 'all';
 }
