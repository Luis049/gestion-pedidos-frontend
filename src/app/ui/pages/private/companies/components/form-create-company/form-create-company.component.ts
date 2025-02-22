import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { SdInputComponent } from "../../../../../components/atoms/sd-input/sd-input.component";
import { HttpModule } from '@infrastructure/shared/http/http.module';
import { CompaniesService } from '@infrastructure/context/companies/companies.service';

@Component({
  selector: 'app-form-create-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SdButtonComponent,
    SdInputComponent,

    HttpModule
],
  templateUrl: './form-create-company.component.html',
  styleUrl: './form-create-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateCompanyComponent {

  private readonly companiesService = inject(CompaniesService);

  @Output() companyCreated = new EventEmitter<void>();
  @Output() companyCancel = new EventEmitter<void>();
  errorMessage: string | null = null;
  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  cancel(){
    this.companyCancel.emit();
  }

  async onSubmit(){
    this.companiesService.createCompany({
      name: this.companyForm.value.name!,
      password: this.companyForm.value.password!,
    }).subscribe((res) => {
      res.fold(
        (error) => {
          if(error.status === 400){
            this.errorMessage = error.message[0];
          }
        },
        (response) => {
          this.companyCreated.emit();
        }
      )
    })
  }

}
