import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { GetToken } from "../../presentation/apiRquest";
import { inject } from "@angular/core";

export const loggoutnGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const router = inject(Router);

    return GetToken.execute().then(token => {
      if (token === null){
        return true;
      }else{
        router.navigate(['/dashboard/home']);
        return false;
      }
    });
}
