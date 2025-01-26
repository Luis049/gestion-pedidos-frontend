import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { apiStores } from '../../../../../../presentation/apiRquest';
import { StoreModel } from '../../../../../../core/domain/context/stores/models/store.model';

@Component({
  selector: 'app-form-edit-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SdInputComponent,
    SdButtonComponent,
  ],
  templateUrl: './form-edit-store.component.html',
  styleUrl: './form-edit-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditStoreComponent implements OnInit {
  storeForm!: FormGroup;
  @Input() storeEdit = signal<StoreModel | null>(null);

  constructor(private fb: FormBuilder) {
    effect(() => {
      this.storeForm.patchValue({
        id: this.storeEdit()?.id,
        name: this.storeEdit()?.name,
        address: this.storeEdit()?.address,
        username: this.storeEdit()?.user.username,
      });
    });
  }

  ngOnInit(): void {
    this.storeForm = this.fb.group({
      id: new FormControl(this.storeEdit()?.id, [Validators.required]),
      name: new FormControl(this.storeEdit()?.name, [Validators.required]),
      address: new FormControl(this.storeEdit()?.address, [Validators.required]),
      username: new FormControl(this.storeEdit()?.user.username, [
        Validators.required,
      ]),
      password: new FormControl(''),
    });
  }

  @Output() storeEdited = new EventEmitter<void>();
  @Output() storeCancel = new EventEmitter<void>();

  messageError = signal<string | null>(null);

  async onSubmit() {
    if (this.storeForm.valid) {
      const response = await apiStores.editStore.execute({
        id: this.storeForm.value.id!,
        name: this.storeForm.value.name!,
        address: this.storeForm.value.address!,
        username: this.storeForm.value.username!,
        password: this.storeForm.value.password!,
      });
      response.fold(
        (error) => {
          if (error.status === 400) {
            this.messageError.set(error.message[0]);
          }
          if(error.status === 404){
            this.messageError.set('No se encontro la tienda');
          }
        },
        (response) => {
          this.messageError.set(null);
          this.storeForm.reset();
          this.storeEdited.emit();
        },
      );
    }
  }

  cancel() {
    this.messageError.set(null);
    this.storeForm.reset();
    this.storeCancel.emit();
  }
}
