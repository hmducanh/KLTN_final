import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

    isLogin = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        this.isLogin = !!this.tokenStorageService.getToken();

        if (this.isLogin) {
            // logged in so return true
            return true;
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}