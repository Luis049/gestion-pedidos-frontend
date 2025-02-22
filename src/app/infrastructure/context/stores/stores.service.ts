import { inject, Injectable } from "@angular/core";
import { HttpService } from "../../shared/http/http.service";
import { catchError, of, switchMap } from "rxjs";
import { StoreModel } from "./models/store.model";
import { ResponseOk } from "../../shared/models/response";
import { StoreCreateDto } from "./models/store-create.dto";
import { StoreEditDto } from "./models/store-edit.dto";
import { Either } from "../../shared/Either/either";
import { ProcessFailure } from "../../shared/Either/process-failure";
import { HttpUseCase } from "@domain/http/usecases/http.usecases";

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor() {}
  http = inject(HttpUseCase);

  getStores() {
    return this.http.get<StoreModel[]>('stores').pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, StoreModel[]>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, StoreModel[]>(error));
      }),
    );
  }

  createStore(store: StoreCreateDto) {
    return this.http.post<ResponseOk>('stores', store).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  editStore(store: StoreEditDto) {
    return this.http.put<ResponseOk>('stores', store).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  listStores() {
    return this.http.get<StoreModel[]>('stores/list').pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, StoreModel[]>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, StoreModel[]>(error.error));
      }),
    );
  }
}
