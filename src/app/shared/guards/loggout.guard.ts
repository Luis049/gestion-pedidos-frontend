import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { GetToken } from "../../presentation/apiRquest";

export const loggoutnGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    return GetToken.execute().then(token => {
      if (token === null){
        return true;
      }else{
        state.url = '/dashboard/home';
        return false;
      }
    });
}
