import { CustomColumnDirective, TableActionEvent, TableConfig } from './../../../components/organisms/sd-table/sd-table.component';

import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit, signal } from '@angular/core';
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
import { apiMachines, apiOrders, apiStores, GetInfoUser } from '../../../../presentation/apiRquest';
import { OrderMapper } from './my-orders/mappers/order.mapper';
import { SdTagComponent } from "../../../components/atoms/sd-tag/sd-tag.component";
import { SdTableComponent } from "../../../components/organisms/sd-table/sd-table.component";
import { OperatorUi } from '../operators/models/operator.ui';

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
    SdTagComponent,
    SdTableComponent,

    CustomColumnDirective
],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [DatePipe],
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

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    // Inject formatDatePipe
    private formatDatePipe: DatePipe
  ) {}

  orders = signal<OrderRowInterface[]>([]);

  tableConfig: TableConfig<OrderRowInterface> = {
    columns: [
      { header: 'Turno', field: 'turno', sortable: true },
      { header: 'Fecha', field: 'fecha', sortable: true,  format: (value) => value ? this.formatDatePipe.transform(value, `d 'de' MMMM y, h:mm a`) || '' : '' },
      { header: 'Cliente', field: 'client', sortable: true },
      { header: 'Archivo', field: 'nameFile', sortable: true, customTemplate: true, align: 'center' },
      { header: 'Máquina', field: 'maquina', sortable: true },
      { header: 'Operador', field: 'operador', sortable: true },
      // { header: 'Estado', field: 'estado', sortable: true },
    ],
    // actions: [
    //   {
    //     label: 'Editar',
    //     action: 'edit',
    //     icon: 'fas fa-edit',
    //     color: 'text-blue-600 hover:text-blue-900'
    //   },
    //   {
    //     label: 'Eliminar',
    //     action: 'delete',
    //     icon: 'fas fa-trash',
    //     color: 'text-red-600 hover:text-red-900',
    //     showIf: (order) => order.status !== 'deleted'
    //   }
    // ],
    showSearch: true,
    showPagination: true,
    sortable: true,
    pageSize: 10,
    customClass: 'my-custom-table'
  }

  ngOnInit(): void {
    this.getMachines();
    this.getOrders();
  }

  machineSelectedChange(machineId: string) {
    this.machineSelected.set(machineId);
    localStorage.setItem('machineSelected', machineId);
  }


  async getMachines() {
    const res = await apiMachines.listMachines.execute({});
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        const stores = [{ label: 'Maquinas', value: '0' }].concat(
          response.map((store) => {
            return {
              label: store.name,
              value: store.id,
            };
          })
        );
        const machineSelectedStorage = localStorage.getItem('machineSelected');
        this.machines.set(stores);
        if(machineSelectedStorage !== null){
          const machine = stores.find(store => store.value === machineSelectedStorage);
          if(machine !== undefined){
            setTimeout(() => {
            this.machineSelected.set(machine.value);
          });
          }
        }
      }
    );
  }

  getOrders(){
    apiOrders.showOrders.execute().subscribe((response) => {
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

  async downloadFile(order: OrderRowInterface) {
    const user = await GetInfoUser.execute();
    const isOperator = user?.roles[0] === 'operator';
    if(isOperator && order.estado === 'Recibido' && this.machineSelected() === '0'){
        alert('No puedes tomar un pedido sin asignar una máquina');
        return;
    }

    if(isOperator && order.estado === 'Recibido' && this.machineSelected() !== '0'){
      this.openFile(order.urlFile);
      this.updateOrder(order);
    }

    if(!isOperator){
      this.openFile(order.urlFile);
    }
  }

  openFile(url: string){
    window.open(url, '_blank');
  }



  async updateOrder(order: OrderRowInterface) {
    if(order.estado === 'Recibido'){
      const res = await apiOrders.switchPrinting.execute({
        orderId: order.id,
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

  onActionClick(event: TableActionEvent<OrderRowInterface>): void {
    // Ahora puedes manejar el evento tipado correctamente
    switch(event.action) {
      case 'edit':
        // Manejar edición
        break;
      case 'delete':
        // Manejar eliminación
        break;
    }
  }

}
