import { LoginCompanyModel, UserModel } from "../../context/auth/models/login.response";

export class StorageService {

  static saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  static getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  static saveUser(user: UserModel) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  static getUser(): UserModel | null {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  static saveCompany(company: LoginCompanyModel) {
    sessionStorage.setItem('company', JSON.stringify(company));
  }

  static getCompany(): LoginCompanyModel {
    return JSON.parse(sessionStorage.getItem('company') || '{}');
  }
}
