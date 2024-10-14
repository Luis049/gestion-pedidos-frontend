import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { apiCompanies } from '../../../../../../presentation/apiRquest';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { SdInputComponent } from "../../../../../components/atoms/sd-input/sd-input.component";

@Component({
  selector: 'app-form-create-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SdButtonComponent,
    SdInputComponent
],
  templateUrl: './form-create-company.component.html',
  styleUrl: './form-create-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateCompanyComponent {
  @Output() companyCreated = new EventEmitter<void>();
  @Output() companyCancel = new EventEmitter<void>();

  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  cancel(){
    this.companyCancel.emit();
  }

  async onSubmit(){
    const res = await apiCompanies.createCompanies.execute({
      name: this.companyForm.value.name!,
      password: this.companyForm.value.password!,
    });
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        this.companyCreated.emit();
      }
    )
  }

}
