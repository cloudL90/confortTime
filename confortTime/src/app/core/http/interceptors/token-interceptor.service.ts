import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { UserSessionService } from '../../userSession/services/user-session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  idToken: string;
  userId: string;
  constructor(private injector: Injector, private userSessionService: UserSessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.userId = this.userSessionService.getUserData()['user_id'];
    /*let localStorageService = this.injector.get(LocalStorageService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorageService.getToken()}`
        ///Authorization: 'Bearer token di prova'
      }
    })*/
    console.log('INTERCEPETED REQUEST', request);

    if (request.url.indexOf(environment.apiGwBaseEndpoint) !== -1)  {
      this.idToken = this.userSessionService.getAuthToken()['jwtToken'];
      let headers = request.headers
      .set("Authorization", `Bearer ${this.idToken}`)

      request = request.clone(
        { 
          headers
        }
      );

    }
   
    console.log('INTERCEPTED REQUEST TRANSFORMED', request);
    //console.log(request.body);
    //console.log(this.idToken);
    //console.log(this.userId);
    return next.handle(request);
  }
}
