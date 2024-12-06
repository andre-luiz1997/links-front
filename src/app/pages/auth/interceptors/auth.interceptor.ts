import { Injectable } from '@angular/core';
import type {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { STORAGE } from '@shared/utils/storage';
import { isEmpty } from '@shared/utils/common';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
 

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token = STORAGE.get(STORAGE.keys.ACCESS_TOKEN);
    let headers = request.headers;
    if(!isEmpty(access_token)) {
      headers = headers.set('Authorization', `Bearer ${access_token}`);
    }
    return next.handle(request.clone({headers, withCredentials: true}));
  }
}
