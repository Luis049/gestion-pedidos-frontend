import { TypeColors } from '../../../../../components/atoms/sd-circule-color/sd-circule-color.component';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { apiMachines, apiStores } from '../../../../../../presentation/apiRquest';
import { SdInputColorComponent } from "../../../../../components/molecules/sd-input-color/sd-input-color.component";
import { SdInputComponent } from "../../../../../components/atoms/sd-input/sd-input.component";
import { SdSelectComponent } from "../../../../../components/atoms/sd-select/sd-select.component";

@Component({
  selector: 'app-form-create-machine',
  templateUrl: './form-create-machine.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, SdButtonComponent, SdInputColorComponent, SdInputComponent, SdSelectComponent],
})
export class FormCreateMachineComponent implements OnInit {
  @Input() storeId: string = '';
  machineForm: FormGroup;
  storesList = signal<{ label: string; value: string }[]>([]);


  @Output() machineCreated = new EventEmitter<void>();
  @Output() machineCancel = new EventEmitter<void>();

  loading = signal(false);
  messageError = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    this.machineForm = this.fb.group({
      machineName: ['', Validators.required],
      color: ['green', Validators.required],
      storedId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.storeId === '') {
      this.getStores();
    } else {
      this.machineForm.patchValue({ storedId: this.storeId });
    }
  }

  async onSubmit() {
    if (this.machineForm.valid) {
      this.loading.set(true);
      const res = await apiMachines.createMachines.execute({
        name: this.machineForm.value.machineName,
        color: this.machineForm.value.color,
        storeId: this.machineForm.value.storedId,
      });

      res.fold(
        (error) => {
          if(error.status === 400){
            this.messageError.set(error.message[0]);
          }
          this.loading.set(false);
        },
        (response) => {
          this.messageError.set(null);
          this.machineForm.reset();
          this.machineCreated.emit();
          this.loading.set(false);
        }
      );
    } else {
      this.messageError.set('El formulario es inválido');
    }
  }
  cancel(){
    this.messageError.set(null);
    this.machineForm.reset();
    this.machineCancel.emit();
  }

  async getStores() {
    const res = await apiStores.listStores.execute();
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        const stores =[
          { label: 'Seleccionar una tienda', value: '' },
          ...response.map((store) => {
            return {
              label: store.name,
              value: store.id,
            };
          }),
        ]
        this.storesList.set(stores);
      },
    );
  }

}
