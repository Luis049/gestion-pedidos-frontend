import { environment } from '../../environments/environment';
import { ApiGateway } from '../core/domain/api/api.gateway';

export class ApiPresentation implements ApiGateway {
  async getHost(): Promise<string> {
    return Promise.resolve(environment.apiUrl);
  }

  async saveToken(token: string): Promise<void> {
    sessionStorage.setItem('token', token);
    Promise.resolve();
  }

  async getToken(): Promise<string> {
    return Promise.resolve(sessionStorage.getItem('token') || '');
  }
}
