import { OperatorModel } from "../../../../../infrastructure/context/operators/model/operator.model";
import { OperatorUi } from "../models/operator.ui";

export class OperatorsMapper {
  static toOperatorModel(operator: OperatorModel): OperatorUi {
    return {
      id: operator.id,
      name: operator.name,
      phone: operator.phone || '',
      storeName: operator.store?.name || '',
      color:  {
        hex: operator.color.primary || '',
        name: operator.color.name || '',
      },
    };
  }
}
