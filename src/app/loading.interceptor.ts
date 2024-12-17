import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('request', request);
    console.log('urlr',request.url);
    let auth = request.headers.get('authorization');
    auth = 'AddingValueFromInterceptor'+ auth ;
    console.log('auth-token : ', auth);
    
    return next.handle(request);
  }
}
