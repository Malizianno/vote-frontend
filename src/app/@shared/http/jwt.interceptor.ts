import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsService } from 'src/app/services/credentials.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private credentials: CredentialsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If login skip
    if (request.url.endsWith('login')) {
      return next.handle(request);
    }

    // console.log('JWT Interceptor here...')
    // add auth header with jwt if account is logged in and request is to the api url
    const isLoggedIn = this.credentials.isAuthenticated();
    const isApiUrl = request.url.startsWith(environment.serverUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.credentials.credentials?.token}`,
          principal: `${this.credentials.credentials?.username}`,
          role: 'ADMIN',
          apikey: 'frontendapikey',
        },
      });
    }

    if (!isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          apikey: 'frontendapikey',
        }
      })
    }

    return next.handle(request);
  }
}
