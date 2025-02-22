import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MachineUi } from './models/machine.ui';
import {
  TableActionEvent,
  TableConfig,
  SdTableComponent,
  CustomColumnDirective,
} from '../../../components/organisms/sd-table/sd-table.component';
import { MachinesMapper } from './mappers/operators.mapper';
import { SdButtonComponent } from '../../../components/atoms/sd-button/sd-button.component';
import { DialogComponent } from '../../../components/molecules/dialog/dialog.component';
import { FormCreateMachineComponent } from './components/form-create/form-create-machine.component';
import { SdSpinnerComponent } from '../../../components/atoms/sd-spinner/sd-spinner.component';
import { SdAlertComponent } from '../../../components/atoms/sd-alert/sd-alert.component';
import { HttpModule } from '../../../../infrastructure/shared/http/http.module';
import { MachinesService } from '../../../../infrastructure/context/machines/machines.service';
import { SdCirculeColorComponent } from '../../../components/atoms/sd-circule-color/sd-circule-color.component';
import { MachineModel } from '@infrastructure/context/machines/models/machines.model';
import { FormEditMachineComponent } from './components/form-edit/form-edit-machine.component';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [
    CommonModule,
    SdTableComponent,
    CustomColumnDirective,
    SdButtonComponent,
    DialogComponent,
    FormCreateMachineComponent,
    SdSpinnerComponent,
    SdAlertComponent,
    HttpModule,
    SdCirculeColorComponent,
    FormEditMachineComponent,
  ],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesComponent implements OnInit {
  private readonly machinesService = inject(MachinesService);

  machineEdit = signal<MachineModel | null>(null);

  @ViewChild('dialogAddMachine') dialogAddMachine!: DialogComponent;
  @ViewChild('dialogEditMachine') dialogEditMachine!: DialogComponent;

  loading = signal(false);
  reload = signal(false);

  messageError = signal<string | null>(null);

  ngOnInit(): void {
    this.updateMachines();
  }

  machinesTable = signal<MachineUi[]>([]);
  machinesModel = signal<MachineModel[]>([]);

  tableConfig: TableConfig<MachineUi> = {
    columns: [
      {
        header: 'Nombre',
        field: 'name',
        sortable: true,
      },
      {
        header: 'Color',
        field: 'color',
        sortable: true,
        customTemplate: true,
      },
      {
        header: 'Tienda',
        field: 'storeName',
        sortable: true,
      },
    ],
    actions: [
      {
        label: 'Editar',
        action: 'edit',
        icon: 'fas fa-edit',
        color: 'text-blue-600 hover:text-blue-900',
      },
      // {
      //   label: 'Eliminar',
      //   action: 'delete',
      //   icon: 'fas fa-trash',
      //   color: 'text-red-600 hover:text-red-900',
      //   showIf: (user) => user.status !== 'deleted'
      // }
    ],
    showSearch: true,
    showPagination: true,
    sortable: true,
    pageSize: 10,
    customClass: 'my-custom-table',
  };
  // Corregimos el tipado del parámetro
  onActionClick(event: TableActionEvent<MachineUi>): void {
    // Ahora puedes manejar el evento tipado correctamente
    switch (event.action) {
      case 'edit':
        const machine = this.machinesModel().find(
          (machine) => machine.id === event.item.id,
        );
        if (machine) {
          this.machineEdit.set(machine);
          this.dialogEditMachine.openDialog();
        }
        break;
      case 'delete':
        // Manejar eliminación
        break;
    }
  }

  async modalCreateMachine() {
    this.dialogAddMachine.openDialog();
  }

  updateMachines() {
    this.loading.set(true);
    this.machinesService.getMachines().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            if (error.status === 400) {
              this.messageError.set(error.message[0]);
            } else {
              this.messageError.set('Error al cargar los datos');
            }
            this.loading.set(false);
            this.reload.set(true);
          },
          (response) => {
            this.machinesTable.set(
              response.data.map(MachinesMapper.toMachineModel),
            );
            this.machinesModel.set(response.data);
            this.loading.set(false);
            this.messageError.set(null);
            this.reload.set(false);
          },
        );
      },
    });
  }
}
