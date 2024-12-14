import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CustomColumnDirective, SdTableComponent, TableActionEvent, TableConfig } from "../../../components/organisms/sd-table/sd-table.component";
import { apiOperators } from '../../../../presentation/apiRquest';
import { OperatorsMapper } from './mappers/operators.mapper';
import { OperatorUi } from './models/operator.ui';
import { SdButtonComponent } from "../../../components/atoms/sd-button/sd-button.component";
import { DialogComponent } from "../../../components/molecules/dialog/dialog.component";
import { FormCreateOperatorComponent } from "./components/form-create/form-create-operator.component";
import { SdSpinnerComponent } from "../../../components/atoms/sd-spinner/sd-spinner.component";
import { SdAlertComponent } from "../../../components/atoms/sd-alert/sd-alert.component";

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [
    CommonModule,
    SdTableComponent,
    CustomColumnDirective,
    SdButtonComponent,
    DialogComponent,
    FormCreateOperatorComponent,
    SdSpinnerComponent,
    SdAlertComponent
],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorsComponent implements OnInit {
  @ViewChild('dialogAddOperator') dialogAddOperator!: DialogComponent;

  loading = signal(false);
  messageError = signal<string | null>(null);
  reload = signal(false);


  ngOnInit(): void {
    this.updateOperator();
  }

  operators = signal<OperatorUi[]>([]);

  tableConfig: TableConfig<OperatorUi> = {
    columns: [
      {
        header: 'Nombre',
        field: 'name',
        sortable: true
      },
      {
        header: 'Telefono',
        field: 'phone',
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
  onActionClick(event: TableActionEvent<OperatorUi>): void {
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

  async updateOperator() {
    this.loading.set(true);
    const res = await apiOperators.getOperators.execute();
    res.fold(
      (error) => {
        if(error.status === 400){
          this.messageError.set(error.message[0]);
        }else{
          this.messageError.set('Error al cargar los datos');
          this.reload.set(true);
        }
        this.loading.set(false);
      },
      (response) => {
        this.operators.set(response.operators.map(OperatorsMapper.toOperatorModel));
        this.loading.set(false);
        this.messageError.set(null);
        this.reload.set(false);
      }
    )
  }

  modalCreateOperator(){
    this.dialogAddOperator.openDialog();
  }
}
