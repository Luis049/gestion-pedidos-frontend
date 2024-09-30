import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SdCardComponent } from "../../../../../../components/atoms/sd-card/sd-card.component";
import { OrderModel } from '../../../../../../../core/domain/context/orders/models/order.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideClock, lucideUser } from '@ng-icons/lucide';
import { SdTagComponent } from "../../../../../../components/atoms/sd-tag/sd-tag.component";
import { SdButtonComponent } from "../../../../../../components/atoms/sd-button/sd-button.component";

export interface OrderCardComponentInterface {
  ref: string;
  turno: number;
  fecha: string;
  estado: 'Recibido' | 'Imprimiendo' | 'Finalizado' | 'Entregado' | 'Cancelado' | 'Impedimento';
  colorEstado: string;
  colorTextEstado: string;
  iconEstado: string;
  maquina?: string;
  colorMaquina?: string;
  operador?: string;
  colorBgOperador?: string;
  colorTextOperador?: string;
}

@Component({
  selector: 'order-card',
  standalone: true,
  imports: [
    CommonModule,
    SdCardComponent,
    NgIcon,
    SdTagComponent,
    SdButtonComponent
],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
  providers: [provideIcons({ lucideCalendar, lucideClock,lucideUser })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCardComponent {
  @Input() order!: OrderCardComponentInterface;
}
