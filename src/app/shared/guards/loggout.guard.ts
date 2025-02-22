import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '@infrastructure/shared/storage/storage.service';

export const loggoutnGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const token = StorageService.getToken();
  console.log(token);

  if (token === null) {
    return true;
  } else {
    router.navigate(['/dashboard/home']);
    return false;
  }
};
