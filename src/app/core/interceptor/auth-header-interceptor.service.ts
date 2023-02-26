import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { request } from 'node:http';
import { Observable } from 'rxjs';
import { TokenstorageService } from '../auth/tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor  {

  constructor(private tokenstorage:TokenstorageService) { }
   
   intercept(req: HttpRequest<any>,
     next: HttpHandler): Observable<HttpEvent<any>> {
     const token = this.tokenstorage.getToken();
     const clonedRequest = req.clone({
       headers: req.headers.set('Authorization', token? `Bearer ${token}`:'')
     });
     return next.handle(clonedRequest);
    //throw new Error('Method not implemented.');
  }
}
