import { Injectable } from "@angular/core";
import { HttpGateway } from "../http.gateway";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class HttpUseCase {
  constructor(private httpGateway: HttpGateway) {}

  get<T>(url: string, options?: any): Observable<T> {
    return this.httpGateway.get<T>(url, options);
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.httpGateway.post<T>(url, body, options);
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.httpGateway.delete<T>(url, options);
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
      return this.httpGateway.put<T>(url, body, options);
  }
}
