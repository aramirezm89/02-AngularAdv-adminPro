import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authservice.usuario.role !== 'ADMIN_ROLE') {
      this.router.navigateByUrl('/dashboard/main');
      return false;
    }

    return true;
  };

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authservice.usuario.role !== 'ADMIN_ROLE') {
      this.router.navigateByUrl('/dashboard/main');
      return false;
    }

    return true;
  };
}
