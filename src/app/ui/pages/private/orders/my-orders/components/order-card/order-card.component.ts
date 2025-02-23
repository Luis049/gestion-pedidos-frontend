import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SdCardComponent } from "../../../../../../components/atoms/sd-card/sd-card.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideClock, lucideUser } from '@ng-icons/lucide';
import { SdTagComponent } from "../../../../../../components/atoms/sd-tag/sd-tag.component";
import { SdButtonComponent } from "../../../../../../components/atoms/sd-button/sd-button.component";

export interface OrderCardComponentInterface {
  id: string;
  ref: string;
  turno: number;
  fecha: string;
  estado: 'Recibido' | 'Imprimiendo' | 'Finalizado' | 'Entregado' | 'Cancelado' | 'Impedimento' | 'Archivado';
  colorEstado: string;
  colorTextEstado: string;
  iconEstado: string;
  maquina: string;
  maquinaColorBg: string;
  maquinaColorText: string;
  operador: string;
  operadorColorBg: string;
  operadorColorText: string;
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
  @Output() orderCancel = new EventEmitter<string>();
  @Output() orderDetail = new EventEmitter<string>();
  @Output() orderEdit = new EventEmitter<string>();
}
