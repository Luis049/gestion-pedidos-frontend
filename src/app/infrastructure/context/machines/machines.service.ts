import { ResponsePagination } from './../../shared/models/response';
import { inject, Injectable } from "@angular/core";
import { HttpService } from "../../shared/http/http.service";
import { MachineModel } from "./models/machines.model";
import { catchError, Observable, of, switchMap } from "rxjs";
import { Either } from "../../shared/Either/either";
import { ProcessFailure } from "../../shared/Either/process-failure";
import { ResponseOk } from "../../shared/models/response";
import { MachineCreateDto } from "./models/machines-create.dto";
import { ListMachinesDto } from "./models/list-macines.dto";
import { HttpUseCase } from "@domain/http/usecases/http.usecases";
import { MachineEditDto } from './models/machines-edit.dto';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  http = inject(HttpUseCase);

  getMachines(): Observable<Either<ProcessFailure, ResponsePagination<MachineModel>>> {
    return this.http.get<ResponsePagination<MachineModel>>('machines').pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponsePagination<MachineModel>>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponsePagination<MachineModel>>(error.error));
      }),
    );
  }

  createMachine(machine: MachineCreateDto): Observable<Either<ProcessFailure, ResponseOk>> {
    return this.http.post<ResponseOk>('machines', machine).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

  listMachines(machine: ListMachinesDto): Observable<Either<ProcessFailure, MachineModel[]>> {
    const queryParams = new HttpParams();
    if (machine.storeId) {
      queryParams.set('storeId', machine.storeId);
    }
    return this.http.get<MachineModel[]>('machines/list', { params: queryParams }).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, MachineModel[]>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, MachineModel[]>(error.error));
      }),
    );
  }

  updateMachine(machine: MachineEditDto): Observable<Either<ProcessFailure, ResponseOk>> {
    return this.http.put<ResponseOk>('machines', machine).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error.error));
      }),
    );
  }

}
