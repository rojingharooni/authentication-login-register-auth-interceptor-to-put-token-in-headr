import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { httpService } from './http.service';

//npm i @auth0/angular-jwt

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSuccessfull: boolean | any = false;
  token: any;
  userName: any;
  userRole: any;

  constructor(private http: httpService , private router:Router,private jwtHelper :JwtHelperService) {

  }



  //get token while log in & post user login info
  login(credentials: any) {

    this.http.post<any>('http://185.213.11.91/api/Account/GetToken', credentials)
      .subscribe(res => {
        localStorage.setItem('token', JSON.stringify(res.token));
        this.isSuccessfull = res.successfuly;
        this.token = res.token;
        this.GetTokenDecoded(this.token);

        if (this.isSuccessfull == true) {
          this.router.navigate(['/']);
        }

      } //kare ke tamom shod result (token) ro be man bede va to local storage zakhore kon
      , error => {
          console.log('error from authlogin is:' + JSON.stringify(error));
      }
    );



  }




//post register  user info && after registeration we route user to login page and get token from there!!!
  register(credentials: any) :Observable<boolean>{

    const result = new Subject<any>();

    this.http.post<any>('http://185.213.11.91/api/Account/Register', credentials).subscribe( p =>
    {
      console.log('p from register:' + JSON.stringify(p.successfuly)+p.errorMessage);
      this.isSuccessfull = p.successfuly;
      result.next(p.successfuly);
    }
    );
      return result.asObservable();

  }


  logout() {
    localStorage.removeItem('token');
}





  tokenPayload: any;
  expirationDate: any;

  GetTokenDecoded(token:any) {
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(token));
    var token2 = JSON.parse(this.tokenPayload);//tokenPlayload is a json.to read its properties we should parse it  into js model
    this.userName = token2.nameid;
    this.userRole = token2.role;

  }

  getTokenExpirationDate(token:any) {
    this.expirationDate = this.jwtHelper.getTokenExpirationDate(token);
  }
  isAuthenticated(token:any): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }





  get isauth() {
    var x = !!localStorage.getItem('token'); //agar token bud true bargardon
    console.log(x);
    return x
  }

  get user() {
    if (!!localStorage.getItem('token')) {
      var x: string = localStorage.getItem('token') || 'ورود';
      this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(x));
      var token2 = JSON.parse(this.tokenPayload);
      this.userName = token2.nameid;
      return this.userName;
    }
    else return 'ورود'
  }
}



