import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthServiceService} from "./auth-service.service";

@Injectable()
export class LoginInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthServiceService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isLogged) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      });
    }

    return next.handle(request);
  }
}
