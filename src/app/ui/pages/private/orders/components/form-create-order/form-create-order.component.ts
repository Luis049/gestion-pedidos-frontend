import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import { SdSelectComponent } from '../../../../../components/atoms/sd-select/sd-select.component';
import { FileInfo, SdFileUploadComponent } from "../../../../../components/molecules/file-upload/file-upload.component";
import { HttpModule } from '../../../../../../infrastructure/shared/http/http.module';
import { OrdersService } from '../../../../../../infrastructure/context/orders/orders.service';
import { StoresService } from '../../../../../../infrastructure/context/stores/stores.service';
import { SelectMapper } from '../../../../utils/mappers/select';

@Component({
  selector: 'app-form-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SdInputComponent,
    SdButtonComponent,
    SdSelectComponent,
    SdFileUploadComponent,
    HttpModule,
  ],
  templateUrl: './form-create-order.component.html',
  styleUrl: './form-create-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateOrderComponent implements OnInit {

  private readonly ordersService = inject(OrdersService);
  private readonly storesService = inject(StoresService);

  ngOnInit(): void {
    this.getStores();
  }
  storesList = signal<{ label: string; value: string }[]>([]);

  @Output() orderCreated = new EventEmitter<void>();
  @Output() orderCancel = new EventEmitter<void>();

  storeSelected = '';
  formOrder = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
    storeId: new FormControl<string>('', [Validators.required]),
    file: new FormControl<File | null>(null, [Validators.required]),
    sizeInMB: new FormControl<number>(0, [Validators.required]),
    widthCm: new FormControl<number>(0, [Validators.required]),
    heightCm: new FormControl<number>(0, [Validators.required]),
  });

  changeStore(storeId: string) {
    this.formOrder.patchValue({ storeId });
  }

  getStores() {
     this.storesService.listStores().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            const stores = SelectMapper.mapSelectStore(response);
            this.formOrder.patchValue({ storeId: stores[0].value });
            this.storeSelected = stores[0].value;
            this.storesList.set(stores);
          }
        )
      }
    })
  }

  onSubmit() {
    if (this.formOrder.value.file !== null) {
      this.ordersService.createOrder({
        description: this.formOrder.value.description || '',
        storeId: this.formOrder.value.storeId || '',
        file: this.formOrder.value.file!,
        sizeInMB: this.formOrder.value.sizeInMB || 0,
        widthCm: this.formOrder.value.widthCm || 0,
        heightCm: this.formOrder.value.heightCm || 0,
      }).subscribe({
        next: (res) => {
          res.fold(
            (error) => {
              console.log(error);
            },
            (response) => {
              this.orderCreated.emit();
              this.formOrder.reset();
            }
          );
        }
      })
    }
  }

  onImagePicked(fileInfo: FileInfo) {
    this.formOrder.patchValue({
      file: fileInfo.file,
      sizeInMB: fileInfo.sizeInMB,
      widthCm: fileInfo.dimensions?.widthCm || 0,
      heightCm: fileInfo.dimensions?.heightCm || 0,
    });
  }
}
