import { inject, Injectable } from "@angular/core";
import { HttpService } from "../../shared/http/http.service";
import { OperatorModel } from "./model/operator.model";
import { catchError, Observable, of, switchMap } from "rxjs";
import { Either } from "../../shared/Either/either";
import { ProcessFailure } from "../../shared/Either/process-failure";
import { OperatorCreateDto } from "./model/operator-create.dto";
import { ResponseOk, ResponsePagination } from "../../shared/models/response";
import { MachineEditDto } from "../machines/models/machines-edit.dto";
import { HttpUseCase } from "@domain/http/usecases/http.usecases";
import { OperatorEditDto } from "./model/operator-edit.dto";

@Injectable({
  providedIn: 'root',
})
export class OperatorsService {
  http = inject(HttpUseCase);

  getOperators(): Observable<Either<ProcessFailure, ResponsePagination<OperatorModel>>> {
    return this.http.get<ResponsePagination<OperatorModel>>('operators').pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponsePagination<OperatorModel>>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponsePagination<OperatorModel>>(error));
      }),
    );
  }

  createOperator(operator: OperatorCreateDto): Observable<Either<ProcessFailure, ResponseOk>> {
    return this.http.post<ResponseOk>('operators', operator).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error));
      }),
    );
  }

  updateOperator(operator: OperatorEditDto): Observable<Either<ProcessFailure, ResponseOk>> {
    return this.http.put<ResponseOk>('operators', operator).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error));
      }),
    );
  }

}
