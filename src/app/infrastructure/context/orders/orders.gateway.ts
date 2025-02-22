import { OrderModel } from "./models/order.model";

export abstract class OrdersGateway {
  abstract getOrders(): Promise<OrderModel[]>;
}
