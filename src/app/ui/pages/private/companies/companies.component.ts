import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CompanyModel } from '../../../../core/domain/context/companies/companies.model';
import { apiCompanies } from '../../../../presentation/apiRquest';
import { SdCardComponent } from "../../../components/atoms/sd-card/sd-card.component";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    SdCardComponent
],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent implements OnInit {
  companies = signal<CompanyModel[]>([]);
  ngOnInit(): void {
    this.getCompanies();
  }

  async getCompanies() {
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
