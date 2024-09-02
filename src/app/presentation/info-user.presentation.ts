import { InfoUserGateway } from "../core/domain/info-user/infoUser.gateway";
import { UserModel } from "../core/domain/info-user/models/user.model";

export class InfoUserPresentation implements InfoUserGateway {

  getInfoUser(): Promise<UserModel> {
    const user = localStorage.getItem('user');
    return Promise.resolve(JSON.parse(user || '{}'));
  }

  saveInfoUser(user: UserModel): Promise<void> {
    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve();
  }
}
