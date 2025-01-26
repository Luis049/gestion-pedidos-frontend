import { Inject, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { GetToken } from "../../presentation/apiRquest";

export const logginGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const router = inject(Router);
    return GetToken.execute().then(token => {
      if(!token) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    });
}
