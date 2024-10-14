import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
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
import { apiOrders, apiStores } from '../../../../../../presentation/apiRquest';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import { SdSelectComponent } from '../../../../../components/atoms/sd-select/sd-select.component';

@Component({
  selector: 'app-form-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SdInputComponent,
    SdButtonComponent,
    SdSelectComponent,
  ],
  templateUrl: './form-create-order.component.html',
  styleUrl: './form-create-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateOrderComponent implements OnInit {
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
  });

  changeStore(storeId: string) {
    this.formOrder.patchValue({ storeId });
  }

  async getStores() {
    const res = await apiStores.listStores.execute();
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        const stores = response.map((store) => {
          return {
            label: store.name,
            value: store.id,
          };
        });
        this.formOrder.patchValue({ storeId: stores[0].value });
        this.storeSelected = stores[0].value;
        this.storesList.set(stores);
      }
    );
  }

  async onSubmit() {
    console.log(this.formOrder.value);
    if (this.formOrder.value.file !== null) {
      const res = await apiOrders.createOrder.execute({
        description: this.formOrder.value.description || '',
        storeId: this.formOrder.value.storeId || '',
        file: this.formOrder.value.file!,
      });
      console.log(res);
      res.fold(
        (error) => {
          console.log(error);
        },
        (response) => {
          this.orderCreated.emit();
          console.log(response);
        }
      );
    }
  }

  onImagePicked(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    const file = fileList?.item(0);
    if (file !== null && file !== undefined) {
      file;
      this.formOrder.patchValue({ file });
    }
  }
}
