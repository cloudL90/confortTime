import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // return this.socialAuthService.authState.pipe(
    //   map((socialUser: SocialUser) => !!socialUser),
    //   tap((isLoggedIn: boolean) => {
    //     if (!isLoggedIn) this.router.navigate(['login'])
    //   })
    // )
    return this.authService.isAuthenticated();
  }
}
