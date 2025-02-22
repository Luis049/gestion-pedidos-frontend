import { HttpClient, HttpEventType } from "@angular/common/http";
import { HttpGateway } from "../../../domain/http/http.gateway";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class HttpService implements HttpGateway {
  _httpClient = inject(HttpClient);

  get<T>(url: string, options?: any): Observable<T> {
    return this._httpClient.get<T>(url, options).pipe(
      map((response) => {
        if(response.type === HttpEventType.Response) {
          return response.body as T;
        }
        return response as T;
      })
    );
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this._httpClient.post<T>(url, body, options).pipe(
      map((response) => {
        if(response.type === HttpEventType.Response) {
          return response.body as T;
        }
        return response as T;
      })
    );
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this._httpClient.delete<T>(url, options).pipe(
      map((response) => {
        if(response.type === HttpEventType.Response) {
          return response.body;
        }
        return response as any;
      })
    );
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this._httpClient.put<T>(url, body, options).pipe(
      map((response) => {
        if(response.type === HttpEventType.Response) {
          return response.body as T;
        }
        return response as T;
      })
    );
  }
}
