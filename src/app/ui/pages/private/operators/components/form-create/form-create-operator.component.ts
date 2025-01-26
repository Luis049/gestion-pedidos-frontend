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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SdInputComponent } from '../../../../../components/atoms/sd-input/sd-input.component';
import { SdButtonComponent } from '../../../../../components/atoms/sd-button/sd-button.component';
import {
  apiOperators,
  apiStores,
} from '../../../../../../presentation/apiRquest';
import { SdInputColorComponent } from '../../../../../components/molecules/sd-input-color/sd-input-color.component';
import { SdSelectComponent } from '../../../../../components/atoms/sd-select/sd-select.component';

@Component({
  selector: 'app-form-create-operator',
  standalone: true,
  imports: [
    CommonModule,
    SdInputComponent,
    SdButtonComponent,
    ReactiveFormsModule,
    SdInputColorComponent,
    SdSelectComponent,
  ],
  templateUrl: './form-create-operator.component.html',
  styleUrl: './form-create-operator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateOperatorComponent implements OnInit {
  storesList = signal<{ label: string; value: string }[]>([]);

  messageError: string | null = null;

  loading = signal(false);

  @Output() operatorCreated = new EventEmitter<void>();
  @Output() operatorCancel = new EventEmitter<void>();
  operatorForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.operatorForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      color: ['red', Validators.required],
      storedId: ['', Validators.required],
    });

    effect(() => this.storeId() !== '' && this.operatorForm.patchValue({ storedId: this.storeId() }) );
  }

  ngOnInit(): void {
    if (this.storeId() === '') {
      this.getStores();
    }
  }

  @Input() storeId = signal('');

  async onSubmit() {
    if (this.operatorForm.valid) {
      this.loading.set(true);
      const response = await apiOperators.createOperator.execute({
        name: this.operatorForm.value.name!,
        phone: this.operatorForm.value.password!,
        color: this.operatorForm.value.color!,
        storeId: this.operatorForm.value.storedId!,
      });
      response.fold(
        (error) => {
          if(error.status === 400){
            const message = Array.isArray(error.message) ? error.message[0] : error.message;
            this.messageError = message;  
          }
          this.loading.set(false);
        },
        (response) => {
          this.operatorCreated.emit();
          this.resetForm();
          this.loading.set(false);
        },
      );
    }
  }

  resetForm(){
    this.operatorForm.patchValue({
      name: '',
      password: '',
      color: 'red',
      storedId: '',
    });
  }

  cancel(){
    this.operatorCancel.emit();
    this.resetForm();
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
