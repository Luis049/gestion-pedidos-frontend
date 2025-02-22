import { UserModel } from "../../auth/models/login.response";

export interface StoreModel {
  id: string;
  name: string;
  address: string;
  operatorsCount: number;
  machinesCount: number;
  ordersCount: number;
  user: UserModel;
}
