import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { apiCompanies } from '../../../../../../presentation/apiRquest';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-create-company',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './form-create-company.component.html',
  styleUrl: './form-create-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateCompanyComponent {

  @Output() companyCreated = new EventEmitter<void>();

  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onSubmit(){
    apiCompanies.createCompanies.execute({
      name: this.companyForm.value.name!,
    });
  }

}
