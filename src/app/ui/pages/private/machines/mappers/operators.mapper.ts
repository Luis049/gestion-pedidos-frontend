import { MachineModel } from "../../../../../core/domain/context/machines/models/machines.model";
import { MachineUi } from "../models/machine.ui";

export class MachinesMapper {
  static toMachineModel(machine: MachineModel): MachineUi {
    return {
      id: machine.id,
      name: machine.name,
      storeName: machine.store?.name || '',
      color: machine.color || '',
    };
  }
}
