import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpUseCase } from '../../../domain/http/usecases/http.usecases';
import { LoginRequest } from './models/login.request';
import { LoginResponse } from './models/login.response';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { StorageService } from '../../shared/storage/storage.service';
import { Either } from '../../shared/Either/either';
import { ProcessFailure } from '../../shared/Either/process-failure';

@Injectable()
export class LoginService {
  httpUseCase = inject(HttpUseCase);

  loginClient(
    loginRequest: LoginRequest,
  ): Observable<Either<ProcessFailure, LoginResponse>> {
    return this.httpUseCase
      .post<LoginResponse>('auth/login-client', loginRequest)
      .pipe(
        switchMap((response) => {
          StorageService.saveToken(response.accessToken);
          StorageService.saveUser(response.user);
          if (response.company) {
            StorageService.saveCompany(response.company);
          }
          return of(Either.right<ProcessFailure, LoginResponse>(response));
        }),
        catchError((error) => {
          return of(Either.left<ProcessFailure, LoginResponse>(error));
        }),
      );
  }

  loginAdmin(
    loginRequest: LoginRequest,
  ): Observable<Either<ProcessFailure, LoginResponse>> {
    return this.httpUseCase
      .post<LoginResponse>('auth/login', loginRequest)
      .pipe(
        switchMap((response) => {
          StorageService.saveToken(response.accessToken);
          StorageService.saveUser(response.user);
          if (response.company) {
            StorageService.saveCompany(response.company);
          }
          return of(Either.right<ProcessFailure, LoginResponse>(response));
        }),
        catchError((error) => {
          return of(Either.left<ProcessFailure, LoginResponse>(error));
        }),
      );
  }
}
