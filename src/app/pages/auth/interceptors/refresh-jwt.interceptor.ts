import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import { STORAGE } from '@shared/utils/storage';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RefreshJwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  private addToken(request: HttpRequest<any>, token?: string | null) {
    if(!token) {
      return request.clone({
        withCredentials: true
      });
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  }

  private logout() {
    STORAGE.clear();
    this.sharedService.clear();
    this.httpClient.get(`${environment.SERVER_URL}/auth/signout`, {withCredentials: true}).subscribe();
    this.router.navigate(['/auth/signin']);
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      if(request.url.includes('auth/refresh')) {
        this.logout();
        return throwError(() => new Error('Refresh token is expired'));
      }
      return this.httpClient.get(`${environment.SERVER_URL}/auth/refresh`, {withCredentials: true}).pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          const access_token = res?.data?.access_token;
          if(access_token) {
            STORAGE.set(STORAGE.keys.ACCESS_TOKEN, access_token);
            this.refreshTokenSubject.next(access_token);
          }
          return next.handle(this.addToken(request, access_token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => error)
        })
      )
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => {
        const req = this.addToken(request, token);
        return next.handle(req);
      })
    )
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token = STORAGE.get(STORAGE.keys.ACCESS_TOKEN);
    const authReq = this.addToken(request, access_token);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('auth/refresh')) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    )
  }
}
