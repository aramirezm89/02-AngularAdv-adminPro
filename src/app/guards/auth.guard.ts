import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,

} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService : AuthService, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.authService.validarToken().pipe(
      tap(autenticado =>{
        if (!autenticado) {
          this.router.navigateByUrl('/login');
        }
      })
    )

  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
   return this.authService.validarToken().pipe(
     tap((autenticado) => {
       if (!autenticado) {
         this.router.navigateByUrl('/login');
       }
     })
   );
  }
}
