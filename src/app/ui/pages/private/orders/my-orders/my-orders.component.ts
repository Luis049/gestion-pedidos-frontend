import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { apiOrders, apiStores } from '../../../../../presentation/apiRquest';
import { SdSelectComponent } from '../../../../components/atoms/sd-select/sd-select.component';
import { SdSearchFieldComponent } from '../../../../components/atoms/sd-search-field/sd-search-field.component';
import { SdCheckboxComponent } from '../../../../components/atoms/sd-checkbox/sd-checkbox.component';
import { OrderModel } from '../../../../../core/domain/context/orders/models/order.model';
import { OrderCardComponent, OrderCardComponentInterface } from './components/order-card/order-card.component';
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
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements OnInit {
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
    const res = await apiStores.listStores.execute();
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        const stores = [{ label: 'Tiendas', value: '0' }].concat(
          response.map((store) => {
            return {
              label: store.name,
              value: store.id,
            };
          })
        );
        this.stores.set(stores);
      }
    );
  }

  uploadOrders() {
    apiOrders.showOrders.execute().subscribe((
      (response) => {
        const orders = response.map(OrderMapper.toOrderCard);
        this.orders.set(orders);
      }
    ))
  }

}
