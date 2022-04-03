import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_ROUTE_HOME_PATH, APP_ROUTE_LOGIN_PATH } from '../costants/auth-path.constants';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Guard implements CanActivate {

  
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  //RECUPERO ACCESS TOKEN

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>(
      (resolve, reject) => {
        console.info('Oauth2Guard', 'kicked with url:', location.href);
        console.log('STATE URL', state.url);
        // redirect with access/id token
        if (state.url === '/access_token' || state.url === '/id_token') {
          
          this.authService.isAuthenticated(false)//redirect dal login a ...
            .then(
              value => {
                console.log('VALUE', value);
                this.router.navigate([APP_ROUTE_HOME_PATH]);
              }
            )
            .catch(
              reason =>{
                console.error('Oauth2Guard', 'ERROR', reason);
                this.router.navigate([APP_ROUTE_LOGIN_PATH])
              }
            )
        }
      }
    )
  }
  
}
