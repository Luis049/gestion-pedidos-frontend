import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild } from "@angular/core";
import { OrderModel } from "@infrastructure/context/orders/models/order.model";
import { OrdersService } from "@infrastructure/context/orders/orders.service";
import { DialogComponent } from "../../../../../components/molecules/dialog/dialog.component";
import { ToastrService } from "ngx-toastr";
import { Either } from "@infrastructure/shared/Either/either";
import { ProcessFailure } from "@infrastructure/shared/Either/process-failure";
import { ResponseOk } from "@infrastructure/shared/models/response";

@Component({
  selector: 'app-change-status-order',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  templateUrl: './change-status-order.component.html',
  styleUrl: './change-status-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeStatusOrderComponent {
  @ViewChild('confirmationDialog') confirmationDialog!: DialogComponent;
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onError = new EventEmitter<void>();

  orderService = inject(OrdersService);
  order = signal<OrderModel | null>(null);

  toastr = inject(ToastrService);

  openDialog(orderId: string): void {
    this.orderService.getOrder(orderId).subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            this.onError.emit()
            this.toastr.error('Error al obtener el pedido');
          },
          (order) => {
            this.order.set(order);
            if(order.status === 'received') {
              this.toastr.warning('Para pasar a imprimir el pedido, debe descargar el archivo');
            }else if(order.status === 'archived'){
                this.toastr.warning('El pedido ya está archivado');
            }else{
              this.confirmationDialog.openDialog();
            }
          },
        );
      },
    });
  }

  messageConfirmation() {
    switch (this.order()?.status) {
      case 'received':
        return '¿Estás seguro de que quieres cambiar el estado del pedido a "Imprimiendo"?';
      case 'printing':
        return '¿Estás seguro de que quieres cambiar el estado del pedido a "Terminado"?';
      case 'finished':
        return '¿Estás seguro de que quieres cambiar el estado del pedido a "Entregado"?';
      case 'delivered':
        return '¿Estás seguro de que quieres cambiar el estado del pedido a "Archivado"?';
      default:
        return '';
    }
  }

  onCancel(): void {
    this.confirmationDialog.closeDialog();
  }

  onConfirm(): void {
    const order = this.order();
    if(order){
      switch (order.status) {
        case 'printing':
          this.orderService.switchFinished({ orderId: order.id }).subscribe({
            next: (res) => this.validResponse(res),
          });
          break;
        case 'finished':
          this.orderService.switchDelivered({ orderId: order.id }).subscribe({
            next: (res) => this.validResponse(res),
          });
          break;
        case 'delivered':
          this.orderService.switchArchived({ orderId: order.id }).subscribe({
            next: (res) => this.validResponse(res),
          });
          break;
      }
    }
  }

  validResponse(res: Either<ProcessFailure, ResponseOk>) {
    res.fold(
      (error) => {
        this.onError.emit();
        this.toastr.error('Error al cambiar el estado del pedido');
        this.confirmationDialog.closeDialog();
      },
      (response) => {
        this.onSuccess.emit();
        this.toastr.success('Estado del pedido cambiado correctamente');
        this.confirmationDialog.closeDialog();
      },
    );
  }
}
