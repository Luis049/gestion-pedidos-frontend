
export type TypeRole = 'super-admin' | 'operator' | 'admin' | 'client' | 'attendant' ;

export interface UserModel {
  username: string;
  roles: string[];
}

export interface LoginCompanyModel {
  name: string;
  preferences: {
    colorPrimary: string;
    colorSecondary: string;
    logo: string;
    icon: string;
  };
}

export interface LoginResponse {
  accessToken: string;
  user: UserModel;
  company?: LoginCompanyModel;
}
