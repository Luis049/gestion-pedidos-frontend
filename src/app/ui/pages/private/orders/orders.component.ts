import {
  CustomColumnDirective,
  TableActionEvent,
  TableConfig,
} from './../../../components/organisms/sd-table/sd-table.component';

import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgModule,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { jamFilter } from '@ng-icons/jam-icons';
import { SdSearchFieldComponent } from '../../../components/atoms/sd-search-field/sd-search-field.component';
import {
  tablerUTurnLeft,
  tablerDownload,
  tablerPrinter,
} from '@ng-icons/tabler-icons';
import { FiltersComponent } from './components/filters/filters.component';
import { SdDropdownComponent } from '../../../components/atoms/sd-dropdown/sd-dropdown.component';
import { machines } from './data/machines.data';
import { tecnicos } from './data/tecnicos.data';
import { states as status } from './data/states.data';
import { OrderMapper } from './my-orders/mappers/order.mapper';
import { SdTagComponent } from '../../../components/atoms/sd-tag/sd-tag.component';
import { SdTableComponent } from '../../../components/organisms/sd-table/sd-table.component';
import { OperatorUi } from '../operators/models/operator.ui';
import { SelectMapper } from '../../utils/mappers/select';
import { HttpModule } from '../../../../infrastructure/shared/http/http.module';
import { StoresService } from '../../../../infrastructure/context/stores/stores.service';
import { OrdersService } from '../../../../infrastructure/context/orders/orders.service';
import { MachineModel } from '../../../../infrastructure/context/machines/models/machines.model';
import { OperatorModel } from '../../../../infrastructure/context/operators/model/operator.model';
import { OrderModel } from '../../../../infrastructure/context/orders/models/order.model';
import { MachinesService } from '../../../../infrastructure/context/machines/machines.service';
import { OperatorsService } from '../../../../infrastructure/context/operators/operators.service';
import { UserModel } from '../../../../infrastructure/context/auth/models/login.response';
import { ShowOrdersService } from '@infrastructure/context/orders/usecases/show-orders-use-case/show-orders-use-case';
import { StorageService } from '@infrastructure/shared/storage/storage.service';
import { DialogComponent } from '../../../components/molecules/dialog/dialog.component';
import { SelectMachineComponent } from './components/select-machine/select-machine.component';
import { DropdownMenuComponent } from '../../../components/molecules/sd-dropdown-menu/sd-dropdown-menu.component';
import { ReportImpedimentComponent } from "./components/report-impediment/report-impediment.component";
import { OrderDetailComponent } from "./my-orders/components/order-detail/order-detail.component";
import { SdAlertComponent } from "../../../components/atoms/sd-alert/sd-alert.component";
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ChangeStatusOrderComponent } from "./components/change-status-order/change-status-order.component";

export interface OrderRowInterface {
  id: string;
  ref: string;
  turno: number;
  fecha: string;
  client: string;
  nameFile: string;
  urlFile: string;
  estado:
    | 'Recibido'
    | 'Imprimiendo'
    | 'Finalizado'
    | 'Entregado'
    | 'Cancelado'
    | 'Impedimento'
    | 'Archivado';
  colorEstado: string;
  colorTextEstado: string;
  iconEstado: string;
  maquina: string;
  maquinaColorBg: string;
  maquinaColorText: string;
  operador: string;
  operadorColorBg: string;
  operadorColorText: string;
  nameStore: string;
  options?: string;
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
    HttpModule,
    CustomColumnDirective,
    DialogComponent,
    SelectMachineComponent,
    DropdownMenuComponent,
    ReportImpedimentComponent,
    OrderDetailComponent,
    SdAlertComponent,
    ChangeStatusOrderComponent
],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [DatePipe],
  viewProviders: [
    provideIcons({
      featherAirplay,
      jamFilter,
      tablerUTurnLeft,
      tablerDownload,
      tablerPrinter,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  @ViewChild('selectMachineDialog') selectMachineDialog!: DialogComponent;
  @ViewChild('reportImpedimentDialog') reportImpedimentDialog!: DialogComponent;
  @ViewChild('orderDetail') orderDetail!: OrderDetailComponent;
  @ViewChild('changeStatusOrder') changeStatusOrder!: ChangeStatusOrderComponent;

  orderSelected = signal<OrderRowInterface | null>(null);

  storesService = inject(StoresService);
  ordersService = inject(OrdersService);
  showOrdersService = inject(ShowOrdersService);
  machinesService = inject(MachinesService);
  operatorsService = inject(OperatorsService);
  private readonly toastr = inject(ToastrService);

  showFilterStore = signal<boolean>(false);
  stores = signal<{ label: string; value: string }[]>([]);
  storeSelected = signal<string>('0');

  showFilterMachine = signal<boolean>(false);
  machines = signal<{ label: string; value: string }[]>([]);
  machinesModel = signal<MachineModel[]>([]);
  machineSelected = signal<string>('0');

  showFilterOperator = signal<boolean>(false);
  operators = signal<{ label: string; value: string }[]>([]);
  operatorsModel = signal<OperatorModel[]>([]);
  operatorSelected = signal<string>('0');

  showFilterStatus = signal<boolean>(false);
  status = signal<{ label: string; value: string }[]>([
    { label: 'Todos los estados', value: 'all' },
    { label: 'Recibidos', value: 'received' },
    { label: 'Imprimiendo', value: 'printing' },
    { label: 'Finalizados', value: 'finished' },
    { label: 'Entregado', value: 'delivered' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Impedimento', value: 'impeded' },
  ]);
  statusSelected = signal<string>('all');

  filtersOrders = signal<{
    storeId: string;
    machineId: string;
    operatorId: string;
    statusId: string;
  }>({ storeId: '0', machineId: '0', operatorId: '0', statusId: 'all' });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    // Inject formatDatePipe
    private formatDatePipe: DatePipe,
  ) {
  }

  orders = signal<OrderRowInterface[]>([]);
  ordersModel = signal<OrderModel[]>([]);

  tableConfig: TableConfig<OrderRowInterface> = {
    columns: [
      { header: 'Ref', field: 'ref' },
      { header: 'Turno', field: 'turno', sortable: true },
      {
        header: 'Fecha',
        field: 'fecha',
        sortable: true,
        format: (value) =>
          value
            ? this.formatDatePipe.transform(value, `d 'de' MMMM y, h:mm a`) ||
              ''
            : '',
      },
      { header: 'Cliente', field: 'client', sortable: true },
      { header: 'Tienda', field: 'nameStore', sortable: true },
      {
        header: 'Archivo',
        field: 'nameFile',
        sortable: true,
        customTemplate: true,
        align: 'center',
      },
      {
        header: 'Máquina',
        field: 'maquina',
        sortable: true,
        customTemplate: true,
      },
      {
        header: 'Operador',
        field: 'operador',
        sortable: true,
        customTemplate: true,
      },
      {
        header: 'Estado',
        field: 'estado',
        sortable: true,
        customTemplate: true,
      },
      { header: '', field: 'options', sortable: true, customTemplate: true },
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
    customClass: 'my-custom-table',
  };

  ngOnInit(): void {
    this.getOrders();
    this.validateFilters();
  }

  machineSelectedChange(machineId: string) {
    this.machineSelected.set(machineId);
    localStorage.setItem('machineSelected', machineId);
  }

  async getMachines(storeId?: string) {
    this.machinesService.listMachines({ storeId }).subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            this.machinesModel.set(response);
            const machines = SelectMapper.mapSelectMachine(response);
            const machineSelectedStorage =
              localStorage.getItem('machineSelected');
            this.machines.set(machines);
            if (machineSelectedStorage !== null) {
              const machine = machines.find(
                (store) => store.value === machineSelectedStorage,
              );
              if (machine !== undefined) {
                setTimeout(() => {
                  this.machineSelected.set(machine.value);
                });
              }
            }
          },
        );
      },
    });
  }

  getOperators(machineId?: string) {
    this.operatorsService.getOperators().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            this.operatorsModel.set(response.data);
            const operators = SelectMapper.mapSelectOperator(response.data);
            this.operators.set(operators);
          },
        );
      },
    });
  }

  getOrders() {
    this.showOrdersService.execute().subscribe({
      next: (res) => {
        this.ordersModel.set(res);
        const ordersRow = res.map(OrderMapper.toOrderRow);
        this.orders.set(ordersRow);
      },
    });
  }

  optiones(order: OrderRowInterface) {
    return [
      {
        label: 'Detalle',
        icon: 'lucideTableProperties',
        event: order,
        action: (order: OrderRowInterface) => this.showDetail(order),
      },
      {
        label: 'Impedimento',
        icon: 'lucideBan',
        event: order,
        disabled: order.estado === 'Recibido',
        action: (order: OrderRowInterface) => this.showImpediment(order),
      },
    ];
  }

  showDetail(order: OrderRowInterface) {
    this.orderDetail.showDetail(order.id);
  }

  showImpediment(order: OrderRowInterface) {
    this.orderSelected.set(order)
    this.reportImpedimentDialog.openDialog();
  }

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

  downloadFileDiaglog(order: OrderRowInterface) {
    this.orderSelected.set(order);
    this.selectMachineDialog.openDialog();
  }

  async downloadFile(machineId: string) {
    const user = StorageService.getUser();
    const order = this.orderSelected();
    const isOperator = user?.roles[0] === 'operator';
    if (isOperator && order?.estado === 'Recibido' && machineId === '0') {
      alert('No puedes tomar un pedido sin asignar una máquina');
      return;
    }
    if (isOperator && order?.estado === 'Recibido' && machineId !== '0') {
      this.openFile(order.urlFile);
      this.updateOrder(order, machineId);
    }
    if (!isOperator) {
      this.openFile(order?.urlFile || '');
    }
    this.selectMachineDialog.closeDialog();
  }

  nextState(order: OrderRowInterface) {
    this.changeStatusOrder.openDialog(order.id);
  }

  openFile(url: string) {
    if (url.includes('http')) {
      window.open(url, '_blank');
    } else {
      window.open(`http://localhost:3000${url}`, '_blank');
    }
  }

  updateOrder(order: OrderRowInterface, machineId: string) {
    if (order.estado === 'Recibido') {
      this.ordersService
        .switchPrinting({
          orderId: order.id,
          machineId: machineId,
        })
        .subscribe({
          next: (res) => {
            res.fold(
              (error) => {
                console.log(error);
              },
              (response) => {
                console.log(response);
              },
            );
          },
        });
    }
  }

  onActionClick(event: TableActionEvent<OrderRowInterface>): void {
    // Ahora puedes manejar el evento tipado correctamente
    switch (event.action) {
      case 'edit':
        // Manejar edición
        break;
      case 'delete':
        // Manejar eliminación
        break;
    }
  }

  setStoreFilter(storeId: string) {
    this.filtersOrders.set({ ...this.filtersOrders(), storeId });
    if (storeId !== '0') {
      this.machines.set(
        SelectMapper.mapSelectMachine(
          this.machinesModel().filter(
            (machine) => machine.store?.id === storeId,
          ),
        ),
      );
      this.showFilterMachine.set(true);
      this.operators.set(
        SelectMapper.mapSelectOperator(
          this.operatorsModel().filter(
            (operator) => operator.store?.id === storeId,
          ),
        ),
      );
      this.showFilterOperator.set(true);

      this.showFilterStatus.set(true);
    } else {
      this.showFilterOperator.set(false);
      this.showFilterMachine.set(false);
      this.showFilterStatus.set(false);
    }
    this.filterOrders();
  }

  setMachineFilter(machineId: string) {
    this.filtersOrders.set({ ...this.filtersOrders(), machineId });
    this.filterOrders();
  }

  setOperatorFilter(operatorId: string) {
    this.filtersOrders.set({ ...this.filtersOrders(), operatorId });
    this.filterOrders();
  }

  setStatusFilter(statusId: string) {
    this.filtersOrders.set({ ...this.filtersOrders(), statusId });
    this.filterOrders();
  }

  async validateFilters() {
    const user = await StorageService.getUser();
    if (user) {
      this.vadalidateFiltersStore(user);
    }
  }

  async vadalidateFiltersStore(user: UserModel) {
    if (['admin'].includes(user?.roles[0])) {
      await this.getStores();
      this.getMachines();
      this.getOperators();
      this.showFilterStore.set(true);
    }
    if (['operator'].includes(user?.roles[0])) {
      this.getMachines();
      this.showFilterMachine.set(true);
    }
  }

  getStores() {
    this.storesService.listStores().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            const stores = SelectMapper.mapSelectStore(response, 'Todas');
            this.stores.set(stores);
          },
        );
      },
    });
  }

  filterOrders() {
    const orderFiltered = this.ordersModel().filter((order) => {
      let filter = true;
      if (this.filtersOrders().storeId !== '0') {
        filter = filter && order.store.id === this.filtersOrders().storeId;
      }
      if (this.filtersOrders().machineId !== '0') {
        filter = filter && order.machine?.id === this.filtersOrders().machineId;
      }
      if (this.filtersOrders().operatorId !== '0') {
        filter =
          filter && order.operator?.id === this.filtersOrders().operatorId;
      }
      if (this.filtersOrders().statusId !== 'all') {
        filter = filter && order.status === this.filtersOrders().statusId;
      }
      return filter;
    });
    this.orders.set(orderFiltered.map(OrderMapper.toOrderRow));
  }

  selectMachine(orderId: string, machineId: string) {
    console.log(orderId, machineId);
  }
}
