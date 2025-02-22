import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = StorageService.getToken();
    const apiReq = req.clone({ url: `${environment.apiUrl}${req.url}`, setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(apiReq);
  }
}
