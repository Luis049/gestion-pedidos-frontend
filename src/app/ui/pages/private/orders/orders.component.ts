
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { jamFilter } from '@ng-icons/jam-icons';
import { SdSearchFieldComponent } from '../../../components/atoms/sd-search-field/sd-search-field.component';
import { tablerUTurnLeft, tablerDownload, tablerPrinter } from "@ng-icons/tabler-icons";
import { FiltersComponent } from './components/filters/filters.component';
import { SdDropdownComponent } from '../../../components/atoms/sd-dropdown/sd-dropdown.component';
import { machines } from './data/machines.data';
import { tecnicos } from './data/tecnicos.data';
import { states } from './data/states.data';
import { ordersData } from './data/orders.data';
import { OrderModel } from '../../../../core/domain/context/orders/models/order.model';
import { apiMachines, apiOrders } from '../../../../presentation/apiRquest';
import { OrderMapper } from './my-orders/mappers/order.mapper';
import { SdTagComponent } from "../../../components/atoms/sd-tag/sd-tag.component";

export interface OrderRowInterface {
  id: string;
  ref: string;
  turno: number;
  fecha: string;
  client: string;
  nameFile: string;
  urlFile: string;
  estado: 'Recibido' | 'Imprimiendo' | 'Finalizado' | 'Entregado' | 'Cancelado' | 'Impedimento';
  colorEstado: string;
  colorTextEstado: string;
  iconEstado: string;
  maquina: string;
  colorBgMaquina: string;
  colorTextMaquina: string;
  operador: string;
  colorBgOperador: string;
  colorTextOperador: string;
}


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    SdSearchFieldComponent,
    FiltersComponent,
    SdDropdownComponent,
    SdTagComponent
],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  viewProviders: [provideIcons({ featherAirplay, jamFilter, tablerUTurnLeft, tablerDownload, tablerPrinter })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {

  machines = signal<{ label: string; value: string }[]>([]);
  machineSelected = signal<string>('0');

  status = signal<{ label: string; value: string }[]>( [
    { label: 'Todos los estados', value: 'all' },
    { label: 'Recibidos', value: 'received' },
    { label: 'Imprimiendo', value: 'printing' },
    { label: 'Finalizados', value: 'finished' },
    { label: 'Entregado', value: 'delivered' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Impedimento', value: 'impeded' },
  ])
  statusSelected = signal<string>('all');

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  orders = signal<OrderRowInterface[]>([]);

  ngOnInit(): void {
    this.getMachines();
    this.getOrders();
  }


  async getMachines() {
    const res = await apiMachines.listMachines.execute();
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        console.log(response);
        const stores = [{ label: 'Maquinas', value: '0' }].concat(
          response.map((store) => {
            return {
              label: store.name,
              value: store.id,
            };
          })
        );
        this.machines.set(stores);
      }
    );
  }

  getOrders(){
    apiOrders.showOrders.execute().subscribe((response) => {
      console.log(response);
      const ordersRow = response.map(OrderMapper.toOrderRow);
      this.orders.set(ordersRow);
    });
  }

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

  downloadFile(order: OrderRowInterface) {
    if(order.estado === 'Recibido' && this.machineSelected() === '0'){
      alert('No puedes tomar un pedido sin asignar una máquina');
    }else{
      window.open(order.urlFile, '_blank');
      this.updateOrder(order);
    }
  }

  async updateOrder(order: OrderRowInterface) {
    if(order.estado === 'Recibido'){
      const res = await apiOrders.patchOrders.execute({
        orderId: order.id,
        status: 'printing',
        machineId : this.machineSelected(),
      });

      res.fold(
        (error) => {
          console.log(error);
        },
        (response) => {
          console.log(response);
        }
      )
    }
  }

}
