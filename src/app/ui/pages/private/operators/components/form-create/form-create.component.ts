import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import { apiOperators } from '../../../../../../presentation/apiRquest';

@Component({
  selector: 'app-form-create-operator',
  standalone: true,
  imports: [
    CommonModule,

    SdInputComponent,
    SdButtonComponent,

    ReactiveFormsModule,
  ],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateOperatorComponent {


  @Output() operatorCreated = new EventEmitter<void>();

  operatorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  @Input() storeId: string = '';


  async onSubmit(){

    if(this.operatorForm.valid){
      const response = await apiOperators.createOperator.execute({
        name: this.operatorForm.value.name!,
        phone: this.operatorForm.value.password!,
        storeId: this.storeId,
      });
      response.fold(
        (error) => {
          console.log(error);
        },
        (response) => {
          console.log(response);
        }
      )
    }
    console.log(this.operatorForm.value);
  }
}
