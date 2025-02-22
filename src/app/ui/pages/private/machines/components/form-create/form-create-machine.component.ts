import { TypeColors } from '../../../../../components/atoms/sd-circule-color/sd-circule-color.component';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { SdInputColorComponent } from "../../../../../components/molecules/sd-input-color/sd-input-color.component";
import { SdInputComponent } from "../../../../../components/atoms/sd-input/sd-input.component";
import { SdSelectComponent } from "../../../../../components/atoms/sd-select/sd-select.component";
import { HttpModule } from '../../../../../../infrastructure/shared/http/http.module';
import { StoresService } from '../../../../../../infrastructure/context/stores/stores.service';
import { MachinesService } from '../../../../../../infrastructure/context/machines/machines.service';
import { SelectMapper } from '../../../../utils/mappers/select';

@Component({
  selector: 'app-form-create-machine',
  templateUrl: './form-create-machine.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, SdButtonComponent, SdInputColorComponent, SdInputComponent, SdSelectComponent, HttpModule],
})
export class FormCreateMachineComponent implements OnInit {

  private readonly machinesService = inject(MachinesService);
  private readonly storesService = inject(StoresService);

  colorSelectedId = signal<string>('');

  @Input() storeId = signal<string>('');
  machineForm: FormGroup;
  storesList = signal<{ label: string; value: string }[]>([]);


  @Output() machineCreated = new EventEmitter<void>();
  @Output() machineCancel = new EventEmitter<void>();

  loading = signal(false);
  messageError = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    this.machineForm = this.fb.group({
      machineName: ['', Validators.required],
      colorId: ['', Validators.required],
      storedId: ['', Validators.required],
    });

    effect(() => this.storeId() !== '' && this.machineForm.patchValue({ storedId: this.storeId() }) );
  }
  ngOnInit(): void {
    if (this.storeId() === '') {
      this.getStores();
    }
  }

  onSubmit() {
    if (this.machineForm.valid) {
      this.loading.set(true);
      this.machinesService.createMachine({
        name: this.machineForm.value.machineName,
        colorId: this.machineForm.value.colorId,
        storeId: this.machineForm.value.storedId,
      }).subscribe({
        next: (res) => {
          res.fold(
            (error) => {
              if(error.status === 400){
                if(Array.isArray(error.message)){
                  this.messageError.set(error.message[0]);
                }else{
                  this.messageError.set(error.message);
                }
              }
              this.loading.set(false);
            },
            (response) => {
              this.messageError.set(null);
              this.resetForm();
              this.machineCreated.emit();
              this.loading.set(false);
            }
          );
        }
      })
    } else {
      this.messageError.set('El formulario es inválido');
    }
  }

  resetForm(){
    this.machineForm.patchValue({
      machineName: '',
      color: 'green',
      storedId: '',
    });
  }

  cancel(){
    this.messageError.set(null);
    this.resetForm();
    this.machineCancel.emit();
  }

  getStores() {
    this.storesService.getStores().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            const stores = SelectMapper.mapSelectStore(response);
            this.storesList.set(stores);
          },
        );
      }
    })
  }

  setColorSelectedId(id: string){
    this.machineForm.patchValue({ colorId: id });
    this.colorSelectedId.set(id);
  }

}
