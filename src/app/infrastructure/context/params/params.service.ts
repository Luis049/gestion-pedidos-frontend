import { inject, Injectable, signal } from "@angular/core";
import { HttpService } from "../../shared/http/http.service";
import { catchError, of, switchMap } from "rxjs";
import { Either } from "../../shared/Either/either";
import { ProcessFailure } from "../../shared/Either/process-failure";
import { ColorModel } from "./models/colors.model";
import { HttpUseCase } from "@domain/http/usecases/http.usecases";

@Injectable({
  providedIn: 'root',
})
export class ParamsService {
  private readonly http = inject(HttpUseCase);
  private colors: ColorModel[] = [];

  getColors() {
    if(this.colors.length === 0) {
      return this.http.get<ColorModel[]>('colors').pipe(
        switchMap((response) => {
          this.colors = response;
          return of(Either.right<ProcessFailure, ColorModel[]>(response));
        }),
        catchError((error: any) => {
            return of(Either.left<ProcessFailure, ColorModel[]>(error));
        }),
      );
    }else{
      return of(Either.right<ProcessFailure, ColorModel[]>(this.colors));
    }
  }
}
