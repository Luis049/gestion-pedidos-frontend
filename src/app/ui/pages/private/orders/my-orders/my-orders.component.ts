import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { SdSelectComponent } from '../../../../components/atoms/sd-select/sd-select.component';
import { SdSearchFieldComponent } from '../../../../components/atoms/sd-search-field/sd-search-field.component';
import { SdCheckboxComponent } from '../../../../components/atoms/sd-checkbox/sd-checkbox.component';
import {
  OrderCardComponent,
  OrderCardComponentInterface,
} from './components/order-card/order-card.component';
import { SdButtonComponent } from '../../../../components/atoms/sd-button/sd-button.component';
import { DialogComponent } from '../../../../components/molecules/dialog/dialog.component';
import { FormCreateOrderComponent } from '../components/form-create-order/form-create-order.component';
import { HttpModule } from '../../../../../infrastructure/shared/http/http.module';
import { StoresService } from '../../../../../infrastructure/context/stores/stores.service';
import { OrdersService } from '../../../../../infrastructure/context/orders/orders.service';
import { SelectMapper } from '../../../utils/mappers/select';
import { ShowOrdersService } from '@infrastructure/context/orders/usecases/show-orders-use-case/show-orders-use-case';
import { OrderMapper } from './mappers/order.mapper';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    OrderCardComponent,
    SdSelectComponent,
    SdSearchFieldComponent,
    SdCheckboxComponent,
    SdButtonComponent,
    DialogComponent,
    FormCreateOrderComponent,

    HttpModule,
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements OnInit {
  storesService = inject(StoresService);
  ordersService = inject(OrdersService);
  showOrdersService = inject(ShowOrdersService);

  @ViewChild('dialogCreateOrder') dialogCreateOrder!: DialogComponent;
  stores = signal<{ label: string; value: string }[]>([]);
  storeSelected = '0';
  status: { label: string; value: string }[] = [
    { label: 'Todos los estados', value: 'all' },
    { label: 'Recibidos', value: 'received' },
    { label: 'Imprimiendo', value: 'printing' },
    { label: 'Finalizados', value: 'finished' },
    { label: 'Entregado', value: 'delivered' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Impedimento', value: 'impeded' },
  ];

  orders = signal<OrderCardComponentInterface[]>([]);
  constructor() {}

  ngOnInit(): void {
    this.getStores();
    this.uploadOrders();
  }

  async getStores() {
    this.storesService.listStores().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            const stores = SelectMapper.mapSelectStore(response);
            this.stores.set(stores);
          },
        );
      },
    });
  }

  uploadOrders() {
    this.showOrdersService.execute().subscribe({
      next: (res) => {
        const orders = res.map(OrderMapper.toOrderCard);
        this.orders.set(orders);
      },
    });
  }

  cancelOrder(orderId: string) {
    console.log(orderId);
  }
}
