import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CompanyModel } from '../../../../core/domain/context/companies/companies.model';
import { apiCompanies } from '../../../../presentation/apiRquest';
import { SdCardComponent } from "../../../components/atoms/sd-card/sd-card.component";
import { SdButtonComponent } from "../../../components/atoms/sd-button/sd-button.component";
import { DialogComponent } from "../../../components/molecules/dialog/dialog.component";
import { FormCreateCompanyComponent } from "./components/form-create-company/form-create-company.component";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    SdCardComponent,
    SdButtonComponent,
    DialogComponent,
    FormCreateCompanyComponent
],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent implements OnInit {

  @ViewChild('dialogAddCompany') dialogAddCompany!: DialogComponent;

  companies = signal<CompanyModel[]>([]);
  ngOnInit(): void {
    this.updateCompany();
  }

  async updateCompany() {
    const res = await apiCompanies.getCompanies.execute();
    res.fold(
      (error) => {
        console.log(error);
      },
      (response) => {
        console.log(response);
        this.companies.set(response.companies);
      }
    );
  }
 }
