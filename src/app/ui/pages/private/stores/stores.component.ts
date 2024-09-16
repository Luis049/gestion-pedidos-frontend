import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { apiStores } from '../../../../presentation/apiRquest';
import { StoreModel } from '../../../../core/domain/context/stores/models/store.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamStore } from '@ng-icons/jam-icons';
import { lucideCross, lucideMapPin, lucidePackage, lucidePencil, lucidePrinter, lucideStore, lucideTrash, lucideUser, lucideUsers } from '@ng-icons/lucide';
import { DialogComponent } from '../../../components/molecules/dialog/dialog.component';
import { FormCreateStoreComponent } from "./componentes/form-create/form-create.component";
import { SdButtonComponent } from '../../../components/atoms/sd-button/sd-button.component';
import { FormCreateOperatorComponent } from '../operators/components/form-create/form-create.component';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    SdButtonComponent,
    NgIcon,


    FormCreateStoreComponent,
    FormCreateOperatorComponent
],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
  providers: [provideIcons({
    jamStore,
     lucideStore,
     lucidePencil,
     lucideTrash,
     lucideMapPin,
     lucideUser,
     lucideUsers,
     lucidePrinter,
     lucidePackage,
     lucideCross
    })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {

  @ViewChild('dialogCreate') dialogCreate!: DialogComponent;
  @ViewChild('dialogAddOperator') dialogAddOperator!: DialogComponent;

  storeId: string = '';


  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.updateStore();
  }

  stores: StoreModel[] = [];

  async updateStore() {
    const res = await apiStores.getStores.execute();
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        this.stores = response.map((store) => {
          return {
            id: store.id,
            name: store.name,
            operators: store.operators,
            address: store.address,
          };
        });
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  async pin(){
    const res = await apiStores.getPing.getEventSourceWithGet();
    res.onmessage = (event) => {
      console.log(event);
    }

    res.onerror = (error) => {
      console.log(error);
    }

    res.onabort = (error) => {
      console.log(error);
    }
  }

  modalCreateStore(){
    this.dialogCreate.openDialog();
  }

  modalAddOperator(storeId: string){
    this.storeId= storeId;
    this.dialogAddOperator.openDialog();
  }
}
