import { TypeColors } from './../../../../../components/atoms/sd-circule-color/sd-circule-color.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { apiMachines } from '../../../../../../presentation/apiRquest';
import { SdInputColorComponent } from "../../../../../components/molecules/sd-input-color/sd-input-color.component";
import { SdInputComponent } from "../../../../../components/atoms/sd-input/sd-input.component";

@Component({
  selector: 'app-form-create-machine',
  templateUrl: './form-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, SdButtonComponent, SdInputColorComponent, SdInputComponent],
})
export class FormCreateMachineComponent {
  @Input() storeId: string = '';
  machineForm: FormGroup;

  @Output() machineCreated = new EventEmitter<void>();
  @Output() machineCancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.machineForm = this.fb.group({
      machineName: ['', Validators.required],
      color: ['green', Validators.required],
    });
  }

  async onSubmit() {
    if (this.machineForm.valid) {
      const res = await apiMachines.createMachines.execute({
        storeId: this.storeId,
        name: this.machineForm.value.machineName,
        color: this.machineForm.value.color,
      });

      res.fold(
        (error) => {
          console.log(error);
        },
        (response) => {
          this.machineCreated.emit();
          console.log(response);
        }
      );
    } else {
      console.log('El formulario es inválido');
    }
  }
}
