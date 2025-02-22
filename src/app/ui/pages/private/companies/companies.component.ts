import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SdCardComponent } from "../../../components/atoms/sd-card/sd-card.component";
import { SdButtonComponent } from "../../../components/atoms/sd-button/sd-button.component";
import { DialogComponent } from "../../../components/molecules/dialog/dialog.component";
import { FormCreateCompanyComponent } from "./components/form-create-company/form-create-company.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideWarehouse } from '@ng-icons/lucide';
import { CompanyModel } from '@infrastructure/context/companies/models/companies.model';
import { HttpModule } from '@infrastructure/shared/http/http.module';
import { CompaniesService } from '@infrastructure/context/companies/companies.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    SdCardComponent,
    SdButtonComponent,
    DialogComponent,
    FormCreateCompanyComponent,
    NgIcon,
    HttpModule
],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  providers: [provideIcons({ lucideWarehouse })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent implements OnInit {

  private readonly companiesService = inject(CompaniesService);

  @ViewChild('dialogAddCompany') dialogAddCompany!: DialogComponent;

  companies = signal<CompanyModel[]>([]);
  ngOnInit(): void {
    this.updateCompany();
  }

  async updateCompany() {
    this.companiesService.getCompanies().subscribe({
      next: (res)=> {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            this.companies.set(response.data);
          }
        );
      }
    })
  }
 }
