import { machines } from './../../data/machines.data';
import { OrderModel } from "../../../../../../infrastructure/context/orders/models/order.model";
import { OrderRowInterface } from "../../orders.component";
import { OrderCardComponentInterface } from "../components/order-card/order-card.component";

export class OrderMapper {
  static toOrderCard(order: OrderModel): OrderCardComponentInterface {
    return {
      id: order.id,
      ref: order.ref,
      turno: order.shiftDay,
      fecha: order.createdAt,
      estado: OrderMapper.getEstado(order.status),
      colorEstado: order.status,
      colorTextEstado: OrderMapper.getColorTextEstado(order.status),
      iconEstado: OrderMapper.getIconEstado(order.status),
      maquina: order.machine?.name || 'Sin asignar',
      maquinaColorBg: order.machine?.color.primary || '#FAFAFA',
      maquinaColorText: order.machine?.color.secondary || '#212121',
      operador: order.operator?.name || 'Sin asignar',
      operadorColorBg: order.operator?.color.primary || '#FAFAFA',
      operadorColorText: order.operator?.color.secondary || '#212121',
    };
  }

  static toOrderRow(order: OrderModel): OrderRowInterface {
    return {
      id: order.id,
      ref: `#${order.ref}`,
      turno: order.shiftDay,
      fecha: order.createdAt,
      client: order.client.username,
      nameFile: order.file.name,
      nameStore: order.store.name,
      urlFile: order.file.url,
      estado: OrderMapper.getEstado(order.status),
      colorEstado: order.status,
      colorTextEstado: OrderMapper.getColorTextEstado(order.status),
      iconEstado: OrderMapper.getIconEstado(order.status),
      maquina: order.machine?.name || 'Sin asignar',
      maquinaColorBg: order.machine?.color.primary || '#FAFAFA',
      maquinaColorText: order.machine?.color.secondary || '#212121',
      operador: order.operator?.name || 'Sin asignar',
      operadorColorBg: order.operator?.color.primary || '#FAFAFA',
      operadorColorText: order.operator?.color.secondary || '#212121',
    };
  }

  private static getEstado(status: string) {
    switch (status) {
      case 'received':
        return 'Recibido';
      case 'printing':
        return 'Imprimiendo';
      case 'finished':
        return 'Finalizado';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      case 'impeded':
        return 'Impedimento';
      case 'archived':
        return 'Archivado';
      default:
        return 'Recibido';
    }
  }

  private static getColorBgEstado(status: string) {
    switch (status) {
      case 'received':
        return 'status-bg-received';
      case 'printing':
        return 'status-bg-printing';
      case 'finished':
        return 'status-bg-finished';
      case 'delivered':
        return 'status-bg-delivered';
      case 'archived':
        return 'status-bg-archived';
      case 'impeded':
        return 'status-bg-impeded';
      default:
        return 'bg-success';
    }
  }

  private static getColorTextEstado(status: string) {
    switch (status) {
      case 'received':
        return 'status-text-received';
      case 'printing':
        return 'status-text-printing';
      case 'finished':
        return 'status-text-finished';
      case 'delivered':
        return 'status-text-delivered';
      case 'archived':
        return 'status-text-archived';
      case 'impeded':
        return 'status-text-impeded';
      default:
        return 'bg-success';
    }
  }

  private static getIconEstado(status: string) {
    switch (status) {
      case 'received':
        return 'lucidePackage';
      case 'printing':
        return 'lucidePrinter';
      case 'finished':
        return 'lucideCircleCheckBig';
      case 'delivered':
        return 'lucideTruck';
      case 'archived':
        return 'lucideArchive';
      case 'impeded':
        return 'lucideTriangleAlert';
      default:
        return 'lucideCheck';
    }
  }
}
