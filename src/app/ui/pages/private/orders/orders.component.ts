
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { jamFilter } from '@ng-icons/jam-icons';
import { SdSearchFieldComponent } from '../../../components/atoms/sd-search-field/sd-search-field.component';
import { tablerUTurnLeft } from "@ng-icons/tabler-icons";
import { FiltersComponent } from './components/filters/filters.component';
import { DropdownComponent } from '../../../components/atoms/dropdown/dropdown.component';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,

    NgIcon,
    SdSearchFieldComponent,
    FiltersComponent,
    DropdownComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  viewProviders: [provideIcons({ featherAirplay, jamFilter, tablerUTurnLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {

  maquinas = [
    {
      label: 'Máquina 1',
      value: 1,
      selected: false,
    },
    {
      label: 'Máquina 2',
      value: 2,
      selected: true,
    },
    {
      label: 'Máquina 3',
      value: 3,
      selected: false,
    }
  ]

  tecnicos = [
    {
      label: 'DANIEL',
      value: 1,
      selected: false,
    },
    {
      label: 'KEVIN',
      value: 2,
      selected: true,
    },
    {
      label: 'Máquina 3',
      value: 3,
      selected: false,
    }
  ]

  states = [
    {
      label: 'Pendiente',
      value: 1,
      selected: false,
    },
    {
      label: 'Imprmimiendo',
      value: 2,
      selected: true,
    },
    {
      label: 'Entregado',
      value: 3,
      selected: false,
    }
  ]
 }
