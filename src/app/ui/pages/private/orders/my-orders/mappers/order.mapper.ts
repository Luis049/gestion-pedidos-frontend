import { OrderModel } from "../../../../../../core/domain/context/orders/models/order.model";
import { OrderRowInterface } from "../../orders.component";
import { OrderCardComponentInterface } from "../components/order-card/order-card.component";

export class OrderMapper {
  // Mapeo para almacenar los colores asignados a cada operador
  private static coloresOperador: { [key: string]: { colorBgOperador: string; colorTextOperador: string } } = {};
  private static indiceColorOperador = 0;

  // Funciones auxiliares para generación de colores
  private static generarColor(indice: number): string {
    // Utilizamos el ángulo áureo para distribuir uniformemente los colores
    const goldenAngle = 137.508;
    const hue = (indice * goldenAngle) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }

  private static obtenerColorTextoAdecuado(colorBgOperador: string): string {
    // Extraemos los valores HSL del color de fondo
    const hsl = colorBgOperador.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
    if (hsl) {
      const l = parseInt(hsl[3], 10);
      return l > 50 ? '#000000' : '#FFFFFF';
    } else {
      // Valor predeterminado si no se puede analizar el color
      return '#FFFFFF';
    }
  }

  static toOrderCard(order: OrderModel): OrderCardComponentInterface {
    // Asignar colores al operador
    let operador = order.operator?.name;
    let colorBgOperador: string;
    let colorTextOperador: string;

    if (!operador) {
      operador = 'Sin asignar';
      colorBgOperador = '#CCCCCC'; // Gris claro
      colorTextOperador = '#666666'; // Gris oscuro
    } else {
      if (!OrderMapper.coloresOperador[operador]) {
        // Genera un nuevo color para el operador
        colorBgOperador = OrderMapper.generarColor(OrderMapper.indiceColorOperador);
        colorTextOperador = OrderMapper.obtenerColorTextoAdecuado(colorBgOperador);
        OrderMapper.coloresOperador[operador] = { colorBgOperador, colorTextOperador };
        OrderMapper.indiceColorOperador++;
      } else {
        colorBgOperador = OrderMapper.coloresOperador[operador].colorBgOperador;
        colorTextOperador = OrderMapper.coloresOperador[operador].colorTextOperador;
      }
    }

    return {
      ref: order.ref,
      turno: order.shiftDay,
      fecha: order.createdAt,
      estado: OrderMapper.getEstado(order.status),
      colorEstado: OrderMapper.getColorBgEstado(order.status),
      colorTextEstado: OrderMapper.getColorTextEstado(order.status),
      iconEstado: OrderMapper.getIconEstado(order.status),
      maquina: order.machine?.name,
      colorMaquina: order.machine?.color,
      operador: operador,
      colorBgOperador: colorBgOperador,
      colorTextOperador: colorTextOperador,
    };
  }

  static toOrderRow(order: OrderModel): OrderRowInterface {
    // Asignar colores al operador
    let operador = order.operator?.name;
    let colorBgOperador: string;
    let colorTextOperador: string;

    if (!operador) {
      operador = 'Sin asignar';
      colorBgOperador = '#CCCCCC'; // Gris claro
      colorTextOperador = '#666666'; // Gris oscuro
    } else {
      if (!OrderMapper.coloresOperador[operador]) {
        // Genera un nuevo color para el operador
        colorBgOperador = OrderMapper.generarColor(OrderMapper.indiceColorOperador);
        colorTextOperador = OrderMapper.obtenerColorTextoAdecuado(colorBgOperador);
        OrderMapper.coloresOperador[operador] = { colorBgOperador, colorTextOperador };
        OrderMapper.indiceColorOperador++;
      } else {
        colorBgOperador = OrderMapper.coloresOperador[operador].colorBgOperador;
        colorTextOperador = OrderMapper.coloresOperador[operador].colorTextOperador;
      }
    }

    return {
      id: order.id,
      ref: order.ref,
      turno: order.shiftDay,
      fecha: order.createdAt,
      client: order.client.username,
      nameFile: order.file.name,
      urlFile: order.file.url,
      estado: OrderMapper.getEstado(order.status),
      colorEstado: OrderMapper.getColorBgEstado(order.status),
      colorTextEstado: OrderMapper.getColorTextEstado(order.status),
      iconEstado: OrderMapper.getIconEstado(order.status),
      maquina: order.machine?.name || 'Sin asignar',
      colorBgMaquina: order.machine?.color || 'status-bg-archived',
      colorTextMaquina: order.machine?.color || 'status-text-archived',
      operador: operador,
      colorBgOperador: colorBgOperador,
      colorTextOperador: colorTextOperador,
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
