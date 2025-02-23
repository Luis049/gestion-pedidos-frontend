import { inject, Injectable } from "@angular/core";
import { HttpService } from "../../shared/http/http.service";
import { catchError, of, switchMap } from "rxjs";
import { OrderModel } from "./models/order.model";
import { ResponseOk } from "../../shared/models/response";
import { CreateOrderDto } from "./models/create-order.dto";
import { PatchMachinesDto } from "./models/patch-machines.dto";
import { Either } from "../../shared/Either/either";
import { ProcessFailure } from "../../shared/Either/process-failure";
import { SwitchPrintingDto } from "./models/switch-printing.dto";
import { HttpUseCase } from "@domain/http/usecases/http.usecases";
import { ReportImpedimentDto } from "./models/report-impediment.dto";
import { SwitchFinishedDto } from "./models/switch-finished.dto";
import { SwitchDeliveredDto } from "./models/switch-delivered.dto";
import { SwitchArchivedDto } from "./models/switch-archived.dto";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http = inject(HttpUseCase);

  getOrders() {
    return this.http.get<OrderModel[]>('orders').pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, OrderModel[]>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, OrderModel[]>(error));
      }),
    );
  }

  getOrder(orderId: string) {
    return this.http.get<OrderModel>(`orders/${orderId}`).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, OrderModel>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, OrderModel>(error));
      }),
    );
  }

  createOrder(order: CreateOrderDto) {
    const formData = new FormData();
    formData.append('description', order.description);
    formData.append('storeId', order.storeId);
    formData.append('file', order.file);
    formData.append('sizeInMB', order.sizeInMB.toString());
    formData.append('widthCm', order.widthCm.toString());
    formData.append('heightCm', order.heightCm.toString());

    return this.http.post<ResponseOk>('orders', formData).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error));
      }),
    );
  }

  patchMachines(order: PatchMachinesDto) {
    return this.http.put<ResponseOk>('orders/patch-machines', order).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  switchPrinting(order: SwitchPrintingDto) {
    return this.http.put<ResponseOk>('orders/switch-printing', order).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  switchFinished(order: SwitchFinishedDto) {
    return this.http.put<ResponseOk>('orders/switch-finished', order).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  switchDelivered(order: SwitchDeliveredDto) {
    return this.http.put<ResponseOk>('orders/switch-delivered', order).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  switchArchived(order: SwitchArchivedDto) {
    return this.http.put<ResponseOk>('orders/switch-archived', order).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  reportImpediment(reportImpediment: ReportImpedimentDto) {
    return this.http.put<ResponseOk>('orders/switch-impediment', reportImpediment).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }
}
