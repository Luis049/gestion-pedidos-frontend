import { ColorModel } from "@infrastructure/context/params/models/colors.model";
import { StoreModel } from "../../stores/models/store.model";

export interface MachineModel {
  id: string;
  name: string;
  color: ColorModel;
  store?: StoreModel;
}
