import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should redirect to /login on 401', () => {
    http.get('/test').subscribe({
      next: () => fail('should have failed with 401'),
      error: () => {},
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(routerSpy).toHaveBeenCalledWith(['/login'], jasmine.any(Object));
  });

  it('should redirect to /login on 403', () => {
    http.get('/test').subscribe({
      next: () => fail('should have failed with 403'),
      error: () => {},
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 403, statusText: 'Forbidden' });

    expect(routerSpy).toHaveBeenCalledWith(['/login'], jasmine.any(Object));
  });

  it('should NOT redirect on 400', () => {
    http.get('/test').subscribe({
      next: () => fail('should have failed with 400'),
      error: () => {},
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 400, statusText: 'Bad Request' });

    expect(routerSpy).not.toHaveBeenCalled();
  });
});
