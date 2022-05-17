import {  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
// E021 aspcoreagular toplearn
//ba config in method dar appModule ke anjam beshe,  har darkhasti ke bekhad be samt server bere in migire- token ro to heder esh qarar mide

      intercept(req: HttpRequest<any>, next: HttpHandler) {
        var token = localStorage.getItem('token');
        // console.log('ge token from inercept' + token);
//requesti ke alan dare mire
        var authRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)

        }
        );
        // console.log('headers:'+JSON.stringify(authRequest));

//darkhaste badin ro handel kin
        return next.handle(authRequest)
  }
}
