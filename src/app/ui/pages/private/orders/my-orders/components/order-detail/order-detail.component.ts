import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { SdTextAreaComponent } from "../../../../../../components/atoms/sd-text-area/sd-text-area.component";
import { HttpModule } from '@infrastructure/shared/http/http.module';
import { CommonModule } from '@angular/common';
import { SdButtonComponent } from "../../../../../../components/atoms/sd-button/sd-button.component";
import { OrdersService } from '@infrastructure/context/orders/orders.service';
import { ReportImpedimentDto } from '@infrastructure/context/orders/models/report-impediment.dto';
import { OrderModel } from '@infrastructure/context/orders/models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    SdTextAreaComponent,
    ReactiveFormsModule,
    HttpModule,
    SdButtonComponent
],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailComponent {

  orderModel = signal<OrderModel | null>(null);

  orderService = inject(OrdersService);

  showDetail(orderId: string): void {
    this.orderService.getOrder(orderId).subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (order) => {
            console.log(order);
            this.orderModel.set(order);
          }
        )
      },
    });
  }

}
