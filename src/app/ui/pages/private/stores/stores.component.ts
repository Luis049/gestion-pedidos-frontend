import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { apiStores } from '../../../../presentation/apiRquest';
import { StoresModel } from '../../../../core/domain/context/stores/models/stores.model';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.updateStore();
  }

  stores: StoresModel[] = [];

  async updateStore() {
    const res = await apiStores.getStores.execute();

    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        console.log(response);
        this.stores = response.map((store) => {
          return {
            id: store.id,
            name: store.name,
            address: store.address,
          };
        });
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}
