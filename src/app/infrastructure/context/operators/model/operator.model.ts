import { ColorModel } from "@infrastructure/context/params/models/colors.model";
import { StoreModel } from "../../stores/models/store.model";

export interface OperatorModel {
  id: string;
  name: string;
  phone: string;
  color: ColorModel;
  store?: StoreModel;
}
