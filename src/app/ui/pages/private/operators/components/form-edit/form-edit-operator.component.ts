import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
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
import { SdInputColorComponent } from '../../../../../components/molecules/sd-input-color/sd-input-color.component';
import { SdSelectComponent } from '../../../../../components/atoms/sd-select/sd-select.component';
import { HttpModule } from '../../../../../../infrastructure/shared/http/http.module';
import { OperatorsService } from '../../../../../../infrastructure/context/operators/operators.service';
import { StoresService } from '../../../../../../infrastructure/context/stores/stores.service';
import { SelectMapper } from '../../../../utils/mappers/select';
import { OperatorModel } from '@infrastructure/context/operators/model/operator.model';

@Component({
  selector: 'app-form-edit-operator',
  standalone: true,
  imports: [
    CommonModule,
    SdInputComponent,
    SdButtonComponent,
    ReactiveFormsModule,
    SdInputColorComponent,
    SdSelectComponent,

    HttpModule,
  ],
  templateUrl: './form-edit-operator.component.html',
  styleUrl: './form-edit-operator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditOperatorComponent implements OnInit {

  @Input({ required: true }) operatorEdit = signal<OperatorModel | null>(null);

  private readonly operatorsService = inject(OperatorsService);
  private readonly storesService = inject(StoresService);

  storesList = signal<{ label: string; value: string }[]>([]);

  messageError: string | null = null;

  loading = signal(false);
  colorSelectedId = signal<string>('');

  @Output() operatorUpdated = new EventEmitter<void>();
  @Output() operatorCancel = new EventEmitter<void>();
  operatorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.operatorForm = this.fb.group({
      id: [this.operatorEdit()?.id, Validators.required],
      name: [this.operatorEdit()?.name, Validators.required],
      password: [this.operatorEdit()?.phone, Validators.required],
      color: [this.operatorEdit()?.color.id, Validators.required],
      storedId: [this.operatorEdit()?.store?.id, Validators.required],
    });
    effect(() => {
      console.log('operatorEdit', this.operatorEdit());
      if(this.operatorEdit() !== null){
        this.operatorForm.patchValue({
          id: this.operatorEdit()?.id,
          name: this.operatorEdit()?.name,
          password: this.operatorEdit()?.phone,
          color: this.operatorEdit()?.color.id,
          storedId: this.operatorEdit()?.store?.id,
        });
        this.colorSelectedId.set(this.operatorEdit()?.color.id || '');
      }
    }, {allowSignalWrites: true})
  }

  ngOnInit(): void {
    this.getStores();
  }

  async onSubmit() {
    if (this.operatorForm.valid) {
      this.loading.set(true);
      this.operatorsService.updateOperator({
        id: this.operatorForm.value.id!,
        name: this.operatorForm.value.name!,
        phone: this.operatorForm.value.password!,
        colorId: this.operatorForm.value.color!,
        storeId: this.operatorForm.value.storedId!,
      }).subscribe({
        next: (res) => {
          res.fold(
            (error) => {
              if(error.status === 400){
                const message = Array.isArray(error.message) ? error.message[0] : error.message;
                this.messageError = message;
              }
              this.loading.set(false);
            },
            (response) => {
              this.operatorUpdated.emit();
              this.resetForm();
              this.loading.set(false);
            },
          );
        },
      });
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
    this.storesService.getStores().subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            console.log(error);
      },
      (response) => {
        const stores = SelectMapper.mapSelectStore(response);
        this.storesList.set(stores);
      })
    }})
  }

  setColorSelectedId(id: string){
    this.colorSelectedId.set(id);
    this.operatorForm.patchValue({ color: id });
  }
}
