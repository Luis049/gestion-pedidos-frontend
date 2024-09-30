import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { GetToken } from "../../presentation/apiRquest";

export const logginGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    return GetToken.execute().then(token => {
      if (token !== null) {
        state.url = '/login';
      }
      return true;
    });
}
