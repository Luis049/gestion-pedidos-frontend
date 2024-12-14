import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MachineUi } from './models/machine.ui';
import { TableActionEvent, TableConfig, SdTableComponent } from '../../../components/organisms/sd-table/sd-table.component';
import { apiMachines } from '../../../../presentation/apiRquest';
import { MachinesMapper } from './mappers/operators.mapper';
import { SdButtonComponent } from "../../../components/atoms/sd-button/sd-button.component";
import { DialogComponent } from "../../../components/molecules/dialog/dialog.component";
import { FormCreateMachineComponent } from "./components/form-create/form-create-machine.component";
import { SdSpinnerComponent } from "../../../components/atoms/sd-spinner/sd-spinner.component";
import { SdAlertComponent } from "../../../components/atoms/sd-alert/sd-alert.component";

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [
    CommonModule,
    SdTableComponent,
    SdButtonComponent,
    DialogComponent,
    FormCreateMachineComponent,
    SdSpinnerComponent,
    SdAlertComponent
],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachinesComponent implements OnInit {

  @ViewChild('dialogAddMachine') dialogAddMachine!: DialogComponent;

  loading = signal(false);
  reload = signal(false);

  messageError = signal<string | null>(null);


  ngOnInit(): void {
    this.updateMachines();
  }

  machines = signal<MachineUi[]>([]);

  tableConfig: TableConfig<MachineUi> = {
    columns: [
      {
        header: 'Nombre',
        field: 'name',
        sortable: true
      },
      {
        header: 'Color',
        field: 'color',
        sortable: true
      },
      {
        header: 'Tienda',
        field: 'storeName',
        sortable: true
      },
    ],
    actions: [
      {
        label: 'Editar',
        action: 'edit',
        icon: 'fas fa-edit',
        color: 'text-blue-600 hover:text-blue-900'
      },
      {
        label: 'Eliminar',
        action: 'delete',
        icon: 'fas fa-trash',
        color: 'text-red-600 hover:text-red-900',
        showIf: (user) => user.status !== 'deleted'
      }
    ],
    showSearch: true,
    showPagination: true,
    sortable: true,
    pageSize: 10,
    customClass: 'my-custom-table'
  };
  // Corregimos el tipado del parámetro
  onActionClick(event: TableActionEvent<MachineUi>): void {
    console.log('Action:', event.action, 'Item:', event.item);
    // Ahora puedes manejar el evento tipado correctamente
    switch(event.action) {
      case 'edit':
        // Manejar edición
        break;
      case 'delete':
        // Manejar eliminación
        break;
    }
  }

  async modalCreateMachine(){
    this.dialogAddMachine.openDialog();
  }


  async updateMachines() {
    this.loading.set(true);
    const res = await apiMachines.getMachines.execute();
    res.fold(
      (error) => {
        if(error.status === 400){
          this.messageError.set(error.message[0]);
        }else{
          this.messageError.set('Error al cargar los datos');
        }
        this.loading.set(false);
        this.reload.set(true);
      },
      (response) => {
        this.machines.set(response.machines.map(MachinesMapper.toMachineModel));
        this.loading.set(false);
        this.messageError.set(null);
        this.reload.set(false);
      }
    )
  }
}
