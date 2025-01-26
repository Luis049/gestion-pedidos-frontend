import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  ViewChild,
} from '@angular/core';
import { apiStores, GetToken } from '../../../../presentation/apiRquest';
import { StoreModel } from '../../../../core/domain/context/stores/models/store.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamStore } from '@ng-icons/jam-icons';
import {
  lucideCross,
  lucideMapPin,
  lucidePackage,
  lucidePencil,
  lucidePrinter,
  lucideStore,
  lucideTrash,
  lucideUser,
  lucideUsers,
} from '@ng-icons/lucide';
import { DialogComponent } from '../../../components/molecules/dialog/dialog.component';
import { FormCreateStoreComponent } from './componentes/form-create/form-create.component';
import { SdButtonComponent } from '../../../components/atoms/sd-button/sd-button.component';
import { FormCreateOperatorComponent } from '../operators/components/form-create/form-create-operator.component';
import { FormCreateMachineComponent } from "../machines/components/form-create/form-create-machine.component";
import { SdSpinnerComponent } from "../../../components/atoms/sd-spinner/sd-spinner.component";
import { FormEditStoreComponent } from "./componentes/form-edit-store/form-edit-store.component";
import { SdAlertComponent } from "../../../components/atoms/sd-alert/sd-alert.component";

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    SdButtonComponent,
    NgIcon,
    FormCreateStoreComponent,
    FormCreateOperatorComponent,
    FormCreateMachineComponent,
    SdSpinnerComponent,
    FormEditStoreComponent,
    SdAlertComponent
],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
  providers: [
    provideIcons({
      jamStore,
      lucideStore,
      lucidePencil,
      lucideTrash,
      lucideMapPin,
      lucideUser,
      lucideUsers,
      lucidePrinter,
      lucidePackage,
      lucideCross,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {
  @ViewChild('dialogCreate') dialogCreate!: DialogComponent;
  @ViewChild('dialogAddOperator') dialogAddOperator!: DialogComponent;
  @ViewChild('dialogAddMachine') dialogAddMachine!: DialogComponent;
  @ViewChild('dialogEditStore') dialogEditStore!: DialogComponent;

  storeId = signal('');

  storeEdit = signal<StoreModel | null>(null);
  reload = signal(false);

  loading = signal(false);
  messageError = signal<string | null>(null);
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.updateStore();
  }

  // stores: StoreModel[] = [];
  stores = signal<StoreModel[]>([]);

  async updateStore() {
    this.loading.set(true);
    this.storeId.set('');
    const res = await apiStores.getStores.execute();
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
        const stores = response.map((store) => {
          return {
            id: store.id,
            name: store.name,
            operatorsCount: store.operatorsCount,
            machinesCount: store.machinesCount,
            ordersCount: store.ordersCount,
            address: store.address,
            user: store.user,
          };
        });
        this.reload.set(false);
        this.stores.set(stores);
        this.loading.set(false);
        this.messageError.set(null);
      }
    );
  }

  modalCreateStore() {
    this.dialogCreate.openDialog();
  }

  modalAddOperator(storeId: string) {
    this.storeId.set(storeId);
    this.dialogAddOperator.openDialog();
  }

  modalAddMaquina(storeId: string) {
    this.storeId.set(storeId);
    this.dialogAddMachine.openDialog();
  }

  modalEditStore(storeId: string) {
    const store = this.stores().find((store) => store.id === storeId);
    if( store){
      this.storeEdit.set(store);
      this.dialogEditStore.openDialog();
    }
  }
}
