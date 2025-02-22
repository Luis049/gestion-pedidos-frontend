import { ChangeDetectionStrategy, Component, Input, signal, computed, Output, EventEmitter } from '@angular/core';
import { MachineModel } from '@infrastructure/context/machines/models/machines.model';
import { MachineUi } from '@ui/pages/private/machines/models/machine.ui';
import { IItem, SdSelectComponent } from "../../../../../components/atoms/sd-select/sd-select.component";
import { SelectMapper } from '@ui/pages/utils/mappers/select';

@Component({
  selector: 'app-select-machine',
  standalone: true,
  imports: [SdSelectComponent],
  templateUrl: './select-machine.component.html',
  styleUrl: './select-machine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMachineComponent {

  @Input() machines = signal<MachineModel[]>([]);
  @Output() machineSelected = new EventEmitter<string>();

  items = computed(() => {
    return SelectMapper.mapSelectMachine(this.machines())
  });

  onMachineSelectedChange(machineId: string) {
    this.machineSelected.emit(machineId);
  }

}
