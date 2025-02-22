import { UserModel } from "@infrastructure/context/auth/models/login.response";
import { OperatorModel } from "../../operators/model/operator.model";
import { StoreModel } from "../../stores/models/store.model";
import { ColorModel } from "@infrastructure/context/params/models/colors.model";
import { MachineModel } from "@infrastructure/context/machines/models/machines.model";

export interface OrderModel {
  id: string;
  ref: string
  description: string;
  shiftDay: number;
  status: string;
  store: StoreModel;
  operator?: OperatorModel;
  machine?: MachineModel;
  client: UserModel;
  createdAt: string;
  updatedAt: string;
  file: FileModel;
}


interface FileModel {
  id: string;
  name: string;
  url: string;
}
