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
import { SdCardComponent } from "../../../../../components/atoms/sd-card/sd-card.component";
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    SdSearchFieldComponent,
    SdCheckboxComponent,
    SdSelectComponent,
    SdCardComponent,
],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  viewProviders: [provideIcons({ featherAirplay, jamFilter, tablerUTurnLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() storeSelectedChange = new EventEmitter<string>();
  @Output() machineSelectedChange = new EventEmitter<string>();
  @Output() operatorSelectedChange = new EventEmitter<string>();
  @Output() statusSelectedChange = new EventEmitter<string>();

  @Input() stores: { label: string; value: string }[] = []
  @Input() showFilterStore = signal<boolean>(false);
  @Input() storeSelected: string = '0';

  @Input() machines: { label: string; value: string }[] = [];
  @Input() showFilterMachine = signal<boolean>(false);
  @Input() machineSelected: string = '0';

  @Input() operators: { label: string; value: string }[] = [];
  @Input() showFilterOperator = signal<boolean>(false);
  @Input() operatorSelected: string = '0';

  @Input() status: { label: string; value: string }[] = []
  @Input() showFilterStatus = signal<boolean>(false);
  @Input() statusSelected: string = 'all';
 }
