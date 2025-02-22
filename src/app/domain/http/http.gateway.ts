import { Observable } from "rxjs";

export abstract class HttpGateway {
  abstract get<T>(url: string, options?: any): Observable<T>;
  abstract post<T>(url: string, body: any, options?: any): Observable<T>;
  abstract put<T>(url: string, body: any, options?: any): Observable<T>;
  abstract delete<T>(url: string, options?: any): Observable<T>;
}
