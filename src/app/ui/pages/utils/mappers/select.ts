import { MachineModel } from "../../../../infrastructure/context/machines/models/machines.model";
import { OperatorModel } from "../../../../infrastructure/context/operators/model/operator.model";
import { StoreModel } from "../../../../infrastructure/context/stores/models/store.model";

interface SelectItem {
  label: string;
  value: string;
}

export class  SelectMapper {
  static mapSelectStore(data: StoreModel[], label?: string):  SelectItem[] {
    return [{ label: label || 'Tiendas', value: '0' }].concat(data.map((item) => {
      return { label: item.name, value: item.id };
    }));
  }

  static mapSelectMachine(data: MachineModel[]):  SelectItem[] {
    return [{ label: 'Maquinas', value: '0' }].concat(data.map((item) => {
      return { label: item.name, value: item.id };
    }));
  }

  static mapSelectOperator(data: OperatorModel[]):  SelectItem[] {
    return [{ label: 'Operadores', value: '0' }].concat(data.map((item) => {
      return { label: item.name, value: item.id };
    }));
  }

  // static mapSelectStatus(data: StatusModel[]):  SelectItem[] {
  //   return [{ label: 'Estados', value: 'all' }].concat(data.map((item) => {
  //     return { label: item.name, value: item.id };
  //   }));
  // }
}
