import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from './authentification.service';
import { Injectable } from '@angular/core';



@Injectable()

export class GuardService implements CanActivate {

    constructor(private authService: AuthentificationService,
        private router: Router) { }
    canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.authStatus) {
            return true;
          } else {
            this.router.navigate(['/login/']);
          }
    
  }
}