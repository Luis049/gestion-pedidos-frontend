import { Inject, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from '@infrastructure/shared/storage/storage.service';

export const logginGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const token = StorageService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
