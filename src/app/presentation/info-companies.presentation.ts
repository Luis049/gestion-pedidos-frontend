import { InfoCompaniesGateway } from "../core/domain/info-companies/info-companies.gateway";
import { CompaniesModel } from "../core/domain/info-companies/models/companies.model";

export class InfoCompanyPresentation implements InfoCompaniesGateway {

  getInfoCompanies(): Promise<CompaniesModel> {
    const company = localStorage.getItem('company');
    return Promise.resolve(JSON.parse(company || '{}'));
  }

  saveInfoCompanies(company: CompaniesModel): Promise<void> {
    localStorage.setItem('company', JSON.stringify(company));
    return Promise.resolve();
  }
}
