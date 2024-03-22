import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    // redirect unauthorized and unknown error to /login
    if (
      response instanceof HttpErrorResponse &&
      (response.status === 401 || response.error.message === 'Error: Unauthorized')
    ) {
      this.router.navigate(['/login'], { queryParams: { error: '401', redirect: this.router.url }, replaceUrl: true });
    }

    throw response;
  }
}
