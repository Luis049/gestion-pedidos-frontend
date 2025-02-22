import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/http/http.service';
import { CompanyModel } from './models/companies.model';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Either } from '../../shared/Either/either';
import { ProcessFailure } from '../../shared/Either/process-failure';
import { CompaniesCreateDto } from './models/companies-create.dto';
import { ResponseOk, ResponsePagination } from '../../shared/models/response';
import { HttpUseCase } from '@domain/http/usecases/http.usecases';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  http = inject(HttpUseCase);

  getCompanies(): Observable<Either<ProcessFailure, ResponsePagination<CompanyModel>>> {
    return this.http.get<ResponsePagination<CompanyModel>>('companies').pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponsePagination<CompanyModel>>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponsePagination<CompanyModel>>(error));
      }),
    );
  }

  createCompany(
    company: CompaniesCreateDto,
  ): Observable<Either<ProcessFailure, ResponseOk>> {
    return this.http.post<ResponseOk>('companies', company).pipe(
      switchMap((response) => {
        return of(Either.right<ProcessFailure, ResponseOk>(response));
      }),
      catchError((error: any) => {
        return of(Either.left<ProcessFailure, ResponseOk>(error));
      }),
    );
  }
}
