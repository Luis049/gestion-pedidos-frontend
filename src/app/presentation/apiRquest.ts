import { ApiAplicacion } from "../core/application/api/api.application";
import { ApiPresentation } from "./api.presentation";
import { InfoCompanyPresentation } from "./info-companies.presentation";
import { InfoUserPresentation } from "./info-user.presentation";

export const {
  login: apiLogin,
  stores: apiStores,
  operators: apiOperators,
  orders: apiOrders,
  machines: apiMachines,
  companies: apiCompanies,
  getInfoUser: GetInfoUser,
  getInfoCompany: GetInfoCompany,
  getToken: GetToken,
} = ApiAplicacion.api({
  intanceApiGateway: new ApiPresentation(),
  intanceInfoUser: new InfoUserPresentation(),
  intanceInfoCompanies: new InfoCompanyPresentation()
});
