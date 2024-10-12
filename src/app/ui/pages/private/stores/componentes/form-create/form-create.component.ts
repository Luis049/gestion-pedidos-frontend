import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { apiStores } from '../../../../../../presentation/apiRquest';

@Component({
  selector: 'app-form-create-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SdInputComponent,
    SdButtonComponent
  ],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateStoreComponent {

  @Output() storeCreated = new EventEmitter<void>();
  @Output() storeCancel = new EventEmitter<void>();
  @Output() storeSaved = new EventEmitter<void>();

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  async onSubmit(){
    if(this.storeForm.valid){
      const response = await apiStores.createStore.execute({
        name: this.storeForm.value.name!,
        address: this.storeForm.value.address!,
        username: this.storeForm.value.username!,
        password: this.storeForm.value.password!,
      });
      response.fold(
        (error) => {
          console.log(error);
        },
        (response) => {
          this.storeSaved.emit();
        }
      )
    }
  }

  cancel(){
    this.storeCancel.emit();
  }
}
