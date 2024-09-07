
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { jamFilter } from '@ng-icons/jam-icons';
import { SdSearchFieldComponent } from '../../../components/atoms/sd-search-field/sd-search-field.component';
import { tablerUTurnLeft, tablerDownload, tablerPrinter } from "@ng-icons/tabler-icons";
import { FiltersComponent } from './components/filters/filters.component';
import { DropdownComponent } from '../../../components/atoms/dropdown/dropdown.component';
import { machines } from './data/machines.data';
import { tecnicos } from './data/tecnicos.data';
import { states } from './data/states.data';
import { ordersData } from './data/orders.data';
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
  viewProviders: [provideIcons({ featherAirplay, jamFilter, tablerUTurnLeft, tablerDownload, tablerPrinter })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  listOrders = ordersData
  get maquinas() {
    return machines.map((machine) => {
      return {
        label: machine.name,
        value: machine.id,
      };
    });
  }

  get tecnicos() {
    return tecnicos.map((tecnico) => {
      return {
        label: tecnico.name,
        value: tecnico.id,
      };
    });
  }

  get states() {
    return states.map((state) => {
      return {
        label: state.name,
        value: state.id,
      };
    });
  }

  get orders() {
    return this.listOrders.map((order) => {
      return {
        id: order.id,
        ref: order.ref,
        date: order.date,
        client: order.client,
        file: order.file,
        machine: machines.find((machine) => machine.id === order.machine),
        tecnico: tecnicos.find((tecnico) => tecnico.id === order.tecnico),
        state: states.find((state) => state.id === order.state),
      };
    });
  }

  selectMachine(orderId: string, machineId: string) {
    this.listOrders = this.listOrders.map((order) => {
      if (order.id === orderId) {
        order.machine = machineId;
      }
      return order;
    });
    this.changeDetectorRef.detectChanges();
  }
  selectTecnico(orderId: string, tecnicoId: string) {
    this.listOrders = this.listOrders.map((order) => {
      if (order.id === orderId) {
        order.tecnico = tecnicoId;
      }
      return order;
    });
    this.changeDetectorRef.detectChanges();
  }
  selectState(orderId: string, stateId: string) {
    this.listOrders = this.listOrders.map((order) => {
      if (order.id === orderId) {
        order.state = stateId;
      }
      return order;
    });
    this.changeDetectorRef.detectChanges();
  }
}
