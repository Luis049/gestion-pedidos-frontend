import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpModule } from '../../../../../../infrastructure/shared/http/http.module';
import { StoresService } from '../../../../../../infrastructure/context/stores/stores.service';

@Component({
  selector: 'app-form-create-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SdInputComponent,
    SdButtonComponent,
    HttpModule,
  ],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateStoreComponent {
  @Output() storeCreated = new EventEmitter<void>();
  @Output() storeCancel = new EventEmitter<void>();
  @Output() storeSaved = new EventEmitter<void>();

  storesService = inject(StoresService);

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  messageError = signal<string | null>(null);

  async onSubmit() {
    if (this.storeForm.valid) {
      this.storesService
        .createStore({
          name: this.storeForm.value.name!,
          address: this.storeForm.value.address!,
          username: this.storeForm.value.username!,
          password: this.storeForm.value.password!,
        })
        .subscribe({
          next: (res) => {
            res.fold(
              (error) => {
                console.log(error);
                if (error.status === 400) {
                  if (Array.isArray(error.message)) {
                    this.messageError.set(error.message[0]);
                  } else {
                    this.messageError.set(error.message);
                  }
                }
              },
              (response) => {
                this.messageError.set(null);
                this.storeForm.reset();
                this.storeSaved.emit();
              },
            );
          },
        });
    }
  }

  cancel() {
    this.messageError.set(null);
    this.storeForm.reset();
    this.storeCancel.emit();
  }
}
