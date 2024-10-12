import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { apiMachines } from '../../../../../../presentation/apiRquest';

@Component({
  selector: 'app-form-create-machine',
  templateUrl: './form-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, SdButtonComponent],
})
export class FormCreateMachineComponent {
  @Input() storeId: string = '';
  machineForm: FormGroup;

  @Output() machineCreated = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.machineForm = this.fb.group({
      machineName: ['', Validators.required],
      color: ['#000000', Validators.required],
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
